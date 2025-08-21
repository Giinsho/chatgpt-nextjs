'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { serverTimestamp } from 'firebase/firestore';
import { db } from "../../../firebase";
import { addDoc, collection } from 'firebase/firestore';
type Props = {
    chatId: string;
    model: string;
};
import { toast } from 'react-hot-toast';

import ModelSelection from '../../../components/ModelSelection';

function ChatInput({ chatId, model }: Props) {
    const [message, setMessage] = useState('');
    const { data: session } = useSession();
    // Replace with your model name

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {

        const input = message.trim();
        setMessage('');


        if (input === '' || !session) {
            console.warn('Message is empty or user is not authenticated');
            return;
        }


        const messageData: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}&background=random`,
            },
        }

        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), messageData);

        //Toast notification for message sent and loading state
        const notification = toast.loading('Chat gpt is thinking...');

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session
            }),
        }).then(() => {
            //Toast notification
            toast.success('ChatGPT has responded!', {
                id: notification,
            });

        }).catch((error) => {
            console.error('Error sending message:', error);
        });

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e as unknown as React.FormEvent<HTMLFormElement>);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center px-4 py-6 sticky bottom-0">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(e);
                }}
                className="flex w-full max-w-3xl border border-gray-700 bg-indigo-950 rounded-2xl p-3 hover:border-indigo-500 transition-all duration-200 hover:shadow-inner shadow-indigo-700/50"
            >
                <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className=" flex-1 w-full min-h-[3rem] max-h-[20vh] bg-transparent text-white text-base placeholder:text-gray-400 focus:outline-none resize-none p-2 rounded-md scrollbar-hide "
                    placeholder="Ask anything..."
                />
            </form>

        </div>
    );
}

export default ChatInput;
