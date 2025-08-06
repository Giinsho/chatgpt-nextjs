'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { db } from '../../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import Message from '../../../components/Message';
type Props = {
    darkMode?: boolean;
    chatId: string;
};

function Chat({ darkMode, chatId }: Props) {
    const { data: session } = useSession();


    const [messages, setMessages] = useCollection(session && query(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc')));


    return (
        <div className=" flex  w-full  px-4 py-6  border-1 border-indigo-600 m-2 max-w-3xl  rounded-bl-2xl rounded-tl-2xl overflow-y-auto">
            <div className={`${darkMode ? 'border-gray-700 bg-indigo-950 text-white' : ' text-black '}   max-h-[60vh]  p-3`}>

                <h2 className="text-lg font-semibold mb-4">Chat Messages</h2>

                <div>

                    {messages && messages.docs.length > 0 ? (
                        messages.docs.map((message) => (
                            <Message key={message.id} message={message.data()} darkMode={darkMode} />
                        ))
                    ) : (
                        <p className="text-gray-400">No messages yet. Start chatting!</p>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Chat;
