BEGIN;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email text UNIQUE NOT NULL,
    name text,
    timezone text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Clients table
CREATE TABLE clients (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    email text,
    color text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_user_id_name ON clients(user_id, name);
CREATE INDEX idx_clients_created_at ON clients(created_at);

-- Projects table
CREATE TABLE projects (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_user_id_client_id ON projects(user_id, client_id);
CREATE INDEX idx_projects_created_at ON projects(created_at);

-- Task Templates table
CREATE TABLE task_templates (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
    project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
    title text NOT NULL,
    description text,
    priority text CHECK (priority IN ('high', 'medium', 'low')) NOT NULL,
    frequency text CHECK (frequency IN ('daily', 'weekly', 'monthly')) NOT NULL,
    frequency_details jsonb,
    estimated_duration_minutes integer,
    is_active boolean DEFAULT true NOT NULL,
    next_due_date date,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_task_templates_user_id ON task_templates(user_id);
CREATE INDEX idx_task_templates_client_id ON task_templates(client_id);
CREATE INDEX idx_task_templates_project_id ON task_templates(project_id);
CREATE INDEX idx_task_templates_next_due_date ON task_templates(next_due_date);
CREATE INDEX idx_task_templates_created_at ON task_templates(created_at);

-- Tasks table
CREATE TABLE tasks (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
    project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
    template_id uuid REFERENCES task_templates(id) ON DELETE SET NULL,
    title text NOT NULL,
    description text,
    priority text CHECK (priority IN ('high', 'medium', 'low')) NOT NULL,
    status text CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending' NOT NULL,
    due_date date,
    estimated_duration_minutes integer,
    completed_at timestamptz,
    gmail_thread_id text,
    gmail_message_id text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_client_id ON tasks(client_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_user_id_due_date_priority ON tasks(user_id, due_date, priority);
CREATE INDEX idx_tasks_gmail_thread_id ON tasks(gmail_thread_id);
CREATE INDEX idx_tasks_gmail_message_id ON tasks(gmail_message_id);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);

-- API Integrations table
CREATE TABLE api_integrations (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    integration_type text CHECK (integration_type IN ('gmail', 'asana', 'clickup', 'slack')) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    credentials jsonb,
    settings jsonb,
    last_sync_at timestamptz,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(user_id, integration_type)
);

CREATE INDEX idx_api_integrations_user_id ON api_integrations(user_id);
CREATE INDEX idx_api_integrations_created_at ON api_integrations(created_at);

-- External Task Mappings table
CREATE TABLE external_task_mappings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    task_id uuid REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
    integration_id uuid REFERENCES api_integrations(id) ON DELETE CASCADE NOT NULL,
    external_id text NOT NULL,
    external_url text,
    sync_status text CHECK (sync_status IN ('synced', 'pending', 'error')) DEFAULT 'pending' NOT NULL,
    last_synced_at timestamptz,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(task_id, integration_id)
);

CREATE INDEX idx_external_task_mappings_user_id ON external_task_mappings(user_id);
CREATE INDEX idx_external_task_mappings_task_id ON external_task_mappings(task_id);
CREATE INDEX idx_external_task_mappings_integration_id ON external_task_mappings(integration_id);
CREATE INDEX idx_external_task_mappings_external_id ON external_task_mappings(external_id);
CREATE INDEX idx_external_task_mappings_created_at ON external_task_mappings(created_at);

-- Task Comments table
CREATE TABLE task_comments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    task_id uuid REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
    content text NOT NULL,
    is_client_visible boolean DEFAULT false NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_task_comments_user_id ON task_comments(user_id);
CREATE INDEX idx_task_comments_task_id ON task_comments(task_id);
CREATE INDEX idx_task_comments_created_at ON task_comments(created_at);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_task_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "owner_all" ON users FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON clients FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON projects FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON task_templates FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON tasks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON api_integrations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON external_task_mappings FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

CREATE POLICY "owner_all" ON task_comments FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
-- TODO: Split into separate SELECT/INSERT/UPDATE/DELETE policies for production

COMMIT;