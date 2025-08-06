import React from 'react'
import { DocumentData } from 'firebase/firestore';

type Props = {
    message: DocumentData;
    darkMode?: boolean;
}

function Message({message, darkMode}: Props) {
  return (
    <div>
        <div className="flex items-start space-x-2 mb-4">
            <img
            src={message.user.avatar}
            alt={message.user.name}
            className="w-8 h-8 rounded-full"
            />
            <div>
            <p className="text-sm font-semibold">{message.user.name}</p>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800' }`}>{message.text}</p>
            <span className={`${darkMode ? 'text-gray-500' : 'text-gray-900' } text-xs`}>
                {message.createdAt?.toDate().toLocaleTimeString()}
            </span>
            </div>
        </div>
    </div>

  )
}

export default Message