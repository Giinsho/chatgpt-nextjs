"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="space-y-4 flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold flex  items-center justify-center px-2">ChatGPT </h1>
      <Image
        src="/logo.svg"
        height={75}
        width={75}
        alt="logo"
        className="text-white"
      />
      <button onClick={() => signIn("google")} className="text-lg text-gray-400 mt-2">
        Please sign in to continue
      </button>
    </div>
  );
}

export default Login;
