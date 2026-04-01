import { google } from 'googleapis';

interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  payload: {
    headers: { name: string; value: string }[];
  };
}

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

const gmail = google.gmail({
  version: 'v1',
  auth: new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GMAIL_CLIENT_EMAIL,
      private_key: process.env.GMAIL_PRIVATE_KEY?.replace(/\\n/g, '\n')
    },
    scopes: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send']
  })
});

export async function getMessages(query?: string, maxResults = 10): Promise<GmailMessage[]> {
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: query,
      maxResults
    });
    return response.data.messages || [];
  } catch (error) {
    throw new Error(`Failed to fetch messages: ${error}`);
  }
}

export async function sendEmail(emailData: EmailData): Promise<any> {
  try {
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: Buffer.from(`To: ${emailData.to}\nSubject: ${emailData.subject}\n\n${emailData.body}`).toString('base64') }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}