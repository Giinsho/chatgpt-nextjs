'use client';

import {
    Timestamp,
    collection,
    query,
    orderBy,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import {
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    TrashIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';

import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type Props = {
    id: string;
    date: Timestamp;
};

function ChatRow({ id, date }: Props) {
    const pathname = usePathname();
    const [active, setActive] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [renameOpen, setRenameOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);
    const renameRef = useRef<HTMLInputElement>(null);

    const { data: session } = useSession();

    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
    );

    const jsDate = date?.toDate();
    const day = jsDate?.getDate().toString().padStart(2, '0');
    const month = (jsDate?.getMonth() + 1).toString().padStart(2, '0');
    const year = jsDate?.getFullYear().toString().slice(-2);
    const hours = jsDate?.getHours().toString().padStart(2, '0');
    const minutes = jsDate?.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

    // Get last message
    const lastMessage = messages?.docs[messages?.docs.length - 1]?.data().text || 'New Chat';

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
                setRenameOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDelete = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
        console.log('Deleting chat:', id);
        setMenuOpen(false);
    };

    const handleRename = () => {
        setNewName(lastMessage); // Set current name as placeholder
        setRenameOpen(true);
        setMenuOpen(false);
    };

    const submitRename = async () => {
        if (!newName.trim()) return;
        await updateDoc(doc(db, 'users', session?.user?.email!, 'chats', id), {
            name: newName.trim(),
        });
        setRenameOpen(false);
    };

    useEffect(() => {
        if (!pathname) return;
        setActive(pathname.includes(id));
    }, [pathname]);

    return (
        <div className={`flex items-center justify-between p-2 ${active && 'bg-sky-900/50  px-1 rounded '}`}>
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
                {renameOpen && (
                    <div className="absolute z-20 mt-2 w-48 bg-white p-3 rounded-md shadow-lg">
                        <input
                            ref={renameRef}
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded mb-2 text-black"
                            placeholder={lastMessage}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    submitRename();
                                }
                            }}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setRenameOpen(false)}
                                className="text-sm text-gray-500 hover:text-black"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitRename}
                                className="text-sm text-blue-500 hover:text-blue-700"
                            >
                                Rename
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Middle: the link */}
            <Link
                href={`/chat/${id}`}
                className="flex-1 mx-2 truncate flex flex-row items-center justify-center space-x-2"
            >
                <div className="chatRowDisplay">
                    <p className="truncate">{lastMessage}</p>
                    <p className="text-gray-400 text-sm">Last message at {formattedDate}</p>
                </div>
                <ChevronRightIcon className=" h-5 w-5 text-gray-400 hover:text-orange-300" />
            </Link>
        </div>
    );
}

export default ChatRow;
