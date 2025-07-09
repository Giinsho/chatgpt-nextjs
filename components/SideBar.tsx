'use client'
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "../components/CharRow";
function SideBar() {

  const { data: session, status } = useSession();

  // Ensure session is loaded and exists before querying Firestore
  const [chats, loading, error] = useCollection(
    session?.user?.email
      ? query(collection(db, "users", session.user.email, "chats"), orderBy("createdAt", "asc")
      ) : null);

  console.log("Chats:", chats?.docs)
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1 ">
        <div>
          <NewChat />
          <div>{/*Module Selection */}</div>

          {/*Map through the ChatRows */}
          {!loading && chats?.docs.map((chat => (
            <div key={chat.id} className="chatRow">
              <ChatRow key={chat.id} id={chat.id} date={chat.data().createdAt} />
            </div>
          )))}
          {error && <p className="text-red-500">Error loading chats: {error.message}</p>}

        </div>
      </div>
      {session && <div className="flex flex-col items-center justify-center mt-5 text-white hover:text-gray-400 cursor-pointer">
        <img onClick={() => signOut()} src={session.user?.image!} alt="Profile picture" className="h-12 w-12 rounded-full mx-auto mb-2 hover:opacity-50" />
        <p>Logout</p>
      </div>


      }
    </div>


  );
}

export default SideBar;
