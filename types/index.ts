export interface User {
  id: string;
  email: string;
  name: string | null;
  timezone: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Client {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  color: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: string;
  user_id: string;
  client_id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TaskTemplate {
  id: string;
  user_id: string;
  client_id: string | null;
  project_id: string | null;
  title: string;
  description: string | null;
  priority: 'high' | 'medium' | 'low';
  frequency: 'daily' | 'weekly' | 'monthly';
  frequency_details: any | null;
  estimated_duration_minutes: number | null;
  is_active: boolean;
  next_due_date: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Task {
  id: string;
  user_id: string;
  client_id: string | null;
  project_id: string | null;
  template_id: string | null;
  title: string;
  description: string | null;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  due_date: string | null;
  estimated_duration_minutes: number | null;
  completed_at: Date | null;
  gmail_thread_id: string | null;
  gmail_message_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ApiIntegration {
  id: string;
  user_id: string;
  integration_type: 'gmail' | 'asana' | 'clickup' | 'slack';
  is_active: boolean;
  credentials: any | null;
  settings: any | null;
  last_sync_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ExternalTaskMapping {
  id: string;
  user_id: string;
  task_id: string;
  integration_id: string;
  external_id: string;
  external_url: string | null;
  sync_status: 'synced' | 'pending' | 'error';
  last_synced_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface TaskComment {
  id: string;
  user_id: string;
  task_id: string;
  content: string;
  is_client_visible: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Database {
  users: {
    Row: User;
    Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
  };
  clients: {
    Row: Client;
    Insert: Omit<Client, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
  };
  projects: {
    Row: Project;
    Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
  };
  task_templates: {
    Row: TaskTemplate;
    Insert: Omit<TaskTemplate, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<TaskTemplate, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
  };
  tasks: {
    Row: Task;
    Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
  };
  api_integrations: {
    Row: ApiIntegration;
    Insert: Omit<ApiIntegration, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<ApiIntegration, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
  };
  external_task_mappings: {
    Row: ExternalTaskMapping;
    Insert: Omit<ExternalTaskMapping, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<ExternalTaskMapping, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
  };
  task_comments: {
    Row: TaskComment;
    Insert: Omit<TaskComment, 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Omit<TaskComment, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
  };
}