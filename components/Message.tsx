import React from 'react'
import { DocumentData } from 'firebase/firestore';

type Props = {
  message: DocumentData;
  darkMode?: boolean;
}

function Message({ message, darkMode }: Props) {
  return (
    <div className="flex items-start space-x-2 mb-3 sm:mb-4">
      <img
        src={message.user.avatar}
        alt={message.user.name}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
      />
      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-semibold truncate">{message.user.name}</p>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} text-sm break-words`}>
          {message.text}
        </p>
        <span className={`${darkMode ? 'text-gray-500' : 'text-gray-900'} text-xs`}>
          {message.createdAt?.toDate().toLocaleTimeString()}
        </span>
      </div>
    </div>

  )
}

export default Message