import { WebClient } from '@slack/web-api';

interface SlackMessage {
  ts: string;
  user: string;
  text: string;
  channel: string;
  type: string;
}

interface SlackChannel {
  id: string;
  name: string;
  is_member: boolean;
  num_members: number;
}

const client = new WebClient(process.env.SLACK_API_KEY!);

export async function getChannelMessages(channel: string, limit = 10): Promise<SlackMessage[]> {
  try {
    const result = await client.conversations.history({
      channel,
      limit
    });
    
    return (result.messages as SlackMessage[]) || [];
  } catch (error) {
    throw new Error(`Failed to fetch messages: ${error}`);
  }
}

export async function sendMessage(channel: string, text: string): Promise<any> {
  try {
    const result = await client.chat.postMessage({
      channel,
      text
    });
    
    return result;
  } catch (error) {
    throw new Error(`Failed to send message: ${error}`);
  }
}