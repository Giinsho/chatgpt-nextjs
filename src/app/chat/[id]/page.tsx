'use client';

import ChatInput from '@/app/pages/ChatInput';
import Chat from '@/app/pages/Chat';
import React, { useState, use } from 'react';
import { Copy } from 'lucide-react';


type Props = {
    params: Promise<{ id: string }>;
};

function ChatPage({ params }: Props) {
    const { id } = use(params); // ⬅️ use React.use() to unwrap the Promise

    const [model, setModel] = useState('gpt-4');
    const [darkMode, setDarkMode] = useState(true);

    const toggleTheme = () => setDarkMode((prev) => !prev);

    const shareChat = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Chat link copied to clipboard!');
    };

    return (
        <div className={`${darkMode ? 'bg-indigo-950 text-white' : 'bg-white text-gray-800'}`}>
            <div className="flex flex-col items-center justify-center min-h-screen h-screen ">
                <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-center mt-4 mb-20">
                    ⚠️ Chat is currently disabled. This site is for testing purposes only.
                </div>
                <h1 className="text-3xl font-bold mb-5 mt-2">Additional options</h1>



                <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-center mb-5 ">
                    {/* Model Selector */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="model" className="font-semibold">Model:</label>
                        <select
                            id="model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="p-2 rounded bg-gray-800 text-white"
                        >
                            <option value="gpt-4.1-mini-2025-04-14">gpt-4.1-mini</option>
                            <option value="gpt-4.1-2025-04-14">gpt-4.1</option>
                            <option value="gpt-4.1-nano-2025-04-14">gpt-4.1-nano</option>
                            <option value="gpt-4.5-preview-2025-02-27">gpt-4.5-preview</option>
                            <option value="gpt-4o-2024-08-06">gpt-4o</option>
                            <option value="o3-2025-04-16">o3</option>

                        </select>

                    </div>

                    {/* Theme Toggle */}
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Theme:</label>
                        <button
                            onClick={toggleTheme}
                            className="px-3 py-1 rounded bg-gray-800 text-white"
                        >
                            {darkMode ? 'Dark' : 'Light'}
                        </button>
                    </div>

                    {/* Share Button */}
                    <button
                        onClick={shareChat}
                        className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        <Copy size={18} /> Share
                    </button>
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
