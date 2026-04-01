import Asana from 'asana';

interface AsanaTask {
  gid: string;
  name: string;
  completed: boolean;
  due_on?: string;
  projects: { gid: string; name: string }[];
}

interface AsanaProject {
  gid: string;
  name: string;
  created_at: string;
}

const client = Asana.Client.create({
  defaultHeaders: { 'asana-enable': 'new_sections,string_ids' }
}).useAccessToken(process.env.ASANA_API_KEY!);

export async function getTasks(projectId?: string): Promise<AsanaTask[]> {
  try {
    const params = projectId ? { project: projectId } : {};
    const tasks = await client.tasks.findAll(params);
    return tasks.data;
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error}`);
  }
}

export async function createTask(name: string, projectId?: string): Promise<AsanaTask> {
  try {
    const taskData: any = { name };
    if (projectId) taskData.projects = [projectId];
    
    const task = await client.tasks.create(taskData);
    return task;
  } catch (error) {
    throw new Error(`Failed to create task: ${error}`);
  }
}