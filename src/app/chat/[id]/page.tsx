
import React from 'react'
type Props = {
    params: Promise<{ id: string }>;
};
async function ChatPage({ params }: Props) {
    const { id } = await params

    const title = id;

    return (
        <div>
            <h1 className="text-white text-3xl font-bold">Chat {title}</h1>
            <p className="text-gray-400 mt-2">This is the chat page for chat ID: {title}</p>

        </div>
    )
}

export default ChatPage