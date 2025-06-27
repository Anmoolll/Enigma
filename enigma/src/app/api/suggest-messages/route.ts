import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages, username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { success: false, message: 'Username is required' },
        { status: 400 }
      );
    }

    const result = streamText({
      model: openai('gpt-3.5-turbo'),
      messages: [
        {
          role: 'system',
          content: "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction."
        },
        ...messages
      ]
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('Error in suggest-messages:', error);
    if (error.name === 'APIError') {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      return NextResponse.json(
        { success: false, message: 'An error occurred while generating messages.' },
        { status: 500 }
      );
    }
  }
}
