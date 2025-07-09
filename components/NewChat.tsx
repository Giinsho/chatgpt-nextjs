'use client'
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";


function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    if (!session) {
      return;
    }
    // Create a new chat in the database
    const doc = await addDoc(
      collection(db, "users", session.user?.email!, "chats"), {
      messages: [],
      userId: session.user?.email,
      createdAt: serverTimestamp(),
      name: "New Chat"
    }
    );
    // Redirect to the new chat page
    await router.push(`/chat/${doc.id}`);


  };
  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow ">
      <PlusIcon className="h-4 w-4 text-yellow-100" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
