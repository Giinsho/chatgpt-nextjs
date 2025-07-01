import React from 'react'
type Props = {
    params: {
        id: string;
    };
};
function ChatPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1 className="text-white text-3xl font-bold">Chat {params.id}</h1>
            <p className="text-gray-400 mt-2">This is the chat page for chat ID: {params.id}</p>

        </div>
    )
}

export default ChatPage