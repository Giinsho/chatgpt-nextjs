import { NextRequest, NextResponse } from 'next/server';
import query from '@/lib/queryApi'; 
import admin from 'firebase-admin';
import adminDb from '../../../../firebaseAdmin'; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, chatId, model, session } = body;

    if (!prompt || !chatId) {
      return NextResponse.json(
        { answer: 'Prompt and Chat ID are required' },
        { status: 400 }
      );
    }

    const response = await query(prompt, model);

    const message: Message = {
      text: response || 'No response from AI',
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: 'ChatGPT',
        name: 'ChatGPT',
        avatar:
          'https://cdn-icons-png.flaticon.com/512/12222/12222560.png',
      },
    };

    await adminDb
      .collection('users')
      .doc(session?.user?.email!)
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(message);

    return NextResponse.json({ answer: message.text });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { answer: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
