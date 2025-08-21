'use client'
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp, query, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    if (!session) {
      return;
    }
    // Create a new chat in the database


    try {

      const userss = collection(db, "users");

      // WRITE TEST
      await setDoc(doc(db, "auth", "testDoc"), {
        message: "Hello Firestore"
      });

      // READ TEST
      const snap = await getDoc(doc(db, "auth", "testDoc"));

    }
    catch (error) {
      console.log("ERROR", error)
    }
    try {
      const doc = await addDoc(
        collection(db, "users", session.user?.email!, "chats"), {
        messages: [],
        userId: session.user?.email,
        createdAt: serverTimestamp(),
        name: "New Chat"
      }
      );
      await router.push(`/chat/${doc.id}`);
    }
    catch (error) {
      console.log("ERROR", error)
    }



    // Redirect to the new chat page



  };
  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow ">
      <PlusIcon className="h-4 w-4 m-1 text-yellow-100" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
