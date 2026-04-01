import axios from 'axios';

interface ClickUpTask {
  id: string;
  name: string;
  status: { status: string; color: string };
  date_created: string;
  due_date?: string;
  url: string;
}

interface ClickUpList {
  id: string;
  name: string;
  orderindex: number;
  status?: string;
}

const client = axios.create({
  baseURL: 'https://api.clickup.com/api/v2',
  headers: {
    'Authorization': process.env.CLICKUP_API_KEY!,
    'Content-Type': 'application/json'
  }
});

export async function getTasks(listId: string): Promise<ClickUpTask[]> {
  try {
    const response = await client.get(`/list/${listId}/task`);
    return response.data.tasks;
  } catch (error) {
    throw new Error(`Failed to fetch tasks: ${error}`);
  }
}

export async function createTask(listId: string, name: string, description?: string): Promise<ClickUpTask> {
  try {
    const response = await client.post(`/list/${listId}/task`, {
      name,
      description
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create task: ${error}`);
  }
}