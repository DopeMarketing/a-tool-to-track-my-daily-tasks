import { supabase } from '@/lib/supabase';
import type { User, Client, Project, TaskTemplate, Task, ApiIntegration, ExternalTaskMapping, TaskComment } from '@/types';

// Users
export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, timezone, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return data || [];
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, name, timezone, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch user: ${error.message}`);
  return data;
}

export async function createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select('id, email, name, timezone, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return data;
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, email, name, timezone, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update user: ${error.message}`);
  return data;
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
}

// Clients
export async function getAllClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('id, user_id, name, email, color, is_active, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch clients: ${error.message}`);
  return data || [];
}

export async function getClientById(id: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('id, user_id, name, email, color, is_active, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch client: ${error.message}`);
  return data;
}

export async function createClient(client: Omit<Client, 'id' | 'created_at' | 'updated_at'>): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .insert(client)
    .select('id, user_id, name, email, color, is_active, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create client: ${error.message}`);
  return data;
}

export async function updateClient(id: string, updates: Partial<Omit<Client, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, name, email, color, is_active, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update client: ${error.message}`);
  return data;
}

export async function deleteClient(id: string): Promise<void> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete client: ${error.message}`);
}

// Projects
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('id, user_id, client_id, name, description, is_active, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch projects: ${error.message}`);
  return data || [];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('id, user_id, client_id, name, description, is_active, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch project: ${error.message}`);
  return data;
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select('id, user_id, client_id, name, description, is_active, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create project: ${error.message}`);
  return data;
}

export async function updateProject(id: string, updates: Partial<Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, client_id, name, description, is_active, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update project: ${error.message}`);
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete project: ${error.message}`);
}

// Tasks
export async function getAllTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('id, user_id, client_id, project_id, template_id, title, description, priority, status, due_date, estimated_duration_minutes, completed_at, gmail_thread_id, gmail_message_id, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch tasks: ${error.message}`);
  return data || [];
}

export async function getTaskById(id: string): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .select('id, user_id, client_id, project_id, template_id, title, description, priority, status, due_date, estimated_duration_minutes, completed_at, gmail_thread_id, gmail_message_id, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch task: ${error.message}`);
  return data;
}

export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select('id, user_id, client_id, project_id, template_id, title, description, priority, status, due_date, estimated_duration_minutes, completed_at, gmail_thread_id, gmail_message_id, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create task: ${error.message}`);
  return data;
}

export async function updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, client_id, project_id, template_id, title, description, priority, status, due_date, estimated_duration_minutes, completed_at, gmail_thread_id, gmail_message_id, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update task: ${error.message}`);
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete task: ${error.message}`);
}

// Task Templates
export async function getAllTaskTemplates(): Promise<TaskTemplate[]> {
  const { data, error } = await supabase
    .from('task_templates')
    .select('id, user_id, client_id, project_id, title, description, priority, frequency, frequency_details, estimated_duration_minutes, is_active, next_due_date, created_at, updated_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch task templates: ${error.message}`);
  return data || [];
}

export async function getTaskTemplateById(id: string): Promise<TaskTemplate | null> {
  const { data, error } = await supabase
    .from('task_templates')
    .select('id, user_id, client_id, project_id, title, description, priority, frequency, frequency_details, estimated_duration_minutes, is_active, next_due_date, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch task template: ${error.message}`);
  return data;
}

export async function createTaskTemplate(template: Omit<TaskTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<TaskTemplate> {
  const { data, error } = await supabase
    .from('task_templates')
    .insert(template)
    .select('id, user_id, client_id, project_id, title, description, priority, frequency, frequency_details, estimated_duration_minutes, is_active, next_due_date, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create task template: ${error.message}`);
  return data;
}

export async function updateTaskTemplate(id: string, updates: Partial<Omit<TaskTemplate, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<TaskTemplate> {
  const { data, error } = await supabase
    .from('task_templates')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, client_id, project_id, title, description, priority, frequency, frequency_details, estimated_duration_minutes, is_active, next_due_date, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update task template: ${error.message}`);
  return data;
}

export async function deleteTaskTemplate(id: string): Promise<void> {
  const { error } = await supabase
    .from('task_templates')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete task template: ${error.message}`);
}

// Task Comments
export async function getAllTaskComments(taskId: string): Promise<TaskComment[]> {
  const { data, error } = await supabase
    .from('task_comments')
    .select('id, user_id, task_id, content, is_client_visible, created_at, updated_at')
    .eq('task_id', taskId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to fetch task comments: ${error.message}`);
  return data || [];
}

export async function getTaskCommentById(id: string): Promise<TaskComment | null> {
  const { data, error } = await supabase
    .from('task_comments')
    .select('id, user_id, task_id, content, is_client_visible, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw new Error(`Failed to fetch task comment: ${error.message}`);
  return data;
}

export async function createTaskComment(comment: Omit<TaskComment, 'id' | 'created_at' | 'updated_at'>): Promise<TaskComment> {
  const { data, error } = await supabase
    .from('task_comments')
    .insert(comment)
    .select('id, user_id, task_id, content, is_client_visible, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to create task comment: ${error.message}`);
  return data;
}

export async function updateTaskComment(id: string, updates: Partial<Omit<TaskComment, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<TaskComment> {
  const { data, error } = await supabase
    .from('task_comments')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, user_id, task_id, content, is_client_visible, created_at, updated_at')
    .single();
  if (error) throw new Error(`Failed to update task comment: ${error.message}`);
  return data;
}

export async function deleteTaskComment(id: string): Promise<void> {
  const { error } = await supabase
    .from('task_comments')
    .delete()
    .eq('id', id);
  if (error) throw new Error(`Failed to delete task comment: ${error.message}`);
}