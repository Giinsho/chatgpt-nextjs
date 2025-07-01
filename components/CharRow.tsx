'use client';

import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    TrashIcon,
    PencilSquareIcon,

} from '@heroicons/react/24/outline';

type Props = {
    id: string;
    date: Timestamp;
};

function ChatRow({ id, date }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const jsDate = date.toDate();
    const day = jsDate.getDate().toString().padStart(2, '0');
    const month = (jsDate.getMonth() + 1).toString().padStart(2, '0');
    const year = jsDate.getFullYear().toString().slice(-2);
    const hours = jsDate.getHours().toString().padStart(2, '0');
    const minutes = jsDate.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDelete = () => {
        console.log('Deleting chat:', id);
        setMenuOpen(false);
    };

    const handleRename = () => {
        console.log('Renaming chat:', id);
        setMenuOpen(false);
    };

    return (
        <div className="flex items-center justify-between p-2 ">
            {/* Left: menu icon + dropdown */}
            <div className="relative mr-2" ref={menuRef}>
                <EllipsisHorizontalIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen((prev) => !prev);
                    }}
                    className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer"
                />
                {menuOpen && (
                    <div className="absolute z-10 mt-1 w-36 bg-white text-black shadow-lg rounded-md p-1 left-0">
                        <button
                            onClick={handleRename}
                            className="w-full text-left px-3 py-1 hover:bg-gray-200 rounded flex items-center justify-start"
                        >
                            <PencilSquareIcon className="inline h-4 w-4 mr-1" />
                            Rename
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full text-left px-3 py-1 hover:bg-red-100 text-red-500 rounded flex items-center justify-start"
                        >
                            <TrashIcon className="inline h-4 w-4 mr-1" />
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Middle: the link */}
            <Link
                href={`/chat/${id}`}
                className="flex-1 mx-2 truncate flex flex-row items-center justify-center space-x-2"
            >
                <div className="chatRowDisplay">
                    <p className="truncate">Chat {id}</p>
                    <p className="text-gray-400 text-sm">Last message at {formattedDate}</p>
                </div>
                {/* Right: Chevron icon (visual only) */}
                <ChevronRightIcon className=" h-5 w-5 text-gray-400 hover:text-orange-300" />
            </Link>


        </div>
    );
}

export default ChatRow;
