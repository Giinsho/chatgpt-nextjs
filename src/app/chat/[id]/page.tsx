'use client';

import ChatInput from '@/app/pages/ChatInput';
import Chat from '@/app/pages/Chat';
import React, { useState, use } from 'react';
import { Copy } from 'lucide-react';
import { ThemeToggle } from '../../../components/ui/theme-toggle';
import ModelSelection from '../../../../components/ModelSelection';
import useSWR from 'swr';


type Props = {
    params: Promise<{ id: string }>;
};

function ChatPage({ params }: Props) {
    const { id } = use(params); // ⬅️ use React.use() to unwrap the Promise
    const { data: model = 'gpt-5', mutate: setModel } = useSWR<string>('model', {
        fallbackData: 'gpt-5',
    });

    const [darkMode, setDarkMode] = useState(true);

    const toggleTheme = () => setDarkMode((prev) => !prev);

    const shareChat = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Chat link copied to clipboard!');
    };

    return (
        <div className={`${darkMode ? 'bg-indigo-950 text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex flex-col items-center justify-center min-h-screen h-screen ">
                <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-center ">
                    ⚠️ Chat is currently disabled. This site is for testing purposes only.
                </div>
                <h1 className="text-3xl font-bold mb-5 mt-2">Additional options</h1>



                <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-center mb-5 ">



                    {/* Model Selector */}
                    <div className="flex items-center gap-2 min-sm:hidden">

                        <label htmlFor="model" className="font-semibold">Model:</label>

                        <ModelSelection />
                    </div>
                    <div className='flex flex-1/2'>


                        <ThemeToggle isDark={darkMode} toggleTheme={toggleTheme} />



                        {/* Share Button */}
                        <button
                            onClick={shareChat}
                            className="flex items-center gap-2 px-4 py-2 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            <Copy size={18} /> Share
                        </button>
                    </div>

                </div>

                {/* Chat content */}
                <Chat darkMode={darkMode} chatId={id} />

                {/* Input section with model passed as prop */}
                <ChatInput chatId={id} model={model} />
            </div>
        </div>
    );
}

export default ChatPage;
