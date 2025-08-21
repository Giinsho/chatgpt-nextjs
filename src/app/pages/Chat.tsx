'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { db } from '../../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import Message from '../../../components/Message';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

type Props = {
    darkMode?: boolean;
    chatId: string;
};

function Chat({ darkMode, chatId }: Props) {
    const { data: session } = useSession();


    const [messages, setMessages] = useCollection(session && query(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc')));


    return (
        <div className="flex w-full sm:w-full md:max-w-3xl px-2 sm:px-4 py-4 border border-indigo-600 m-2 rounded-bl-2xl rounded-tl-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent
              hover:scrollbar-thumb-indigo-500">
            <div
                className={`${darkMode ? 'border-gray-700 bg-indigo-950 text-white' : 'text-black'}
                h-[70vh] sm:h-[60vh] w-full p-2 sm:p-3`}
            >
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 ">Chat Messages</h2>
                <div className="space-y-3">
                    {messages && messages.docs.length > 0 ? (
                        messages.docs.map((message) => (
                            <Message key={message.id} message={message.data()} darkMode={darkMode} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <p className="text-gray-400 text-sm sm:text-base">No messages yet. Start chatting!</p>
                            <ArrowDownCircleIcon className="h-8 w-8 sm:h-10 sm:w-10 mt-2 text-dim-white animate-bounce" />
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default Chat;
