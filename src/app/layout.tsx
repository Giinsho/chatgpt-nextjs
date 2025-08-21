import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "../../components/SideBar";

import { SessionProvider } from "../../components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ClientProvider from "../../components/ClientProvider";
import Login from "../../components/Login";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatGPT NextJs",
  description: "ChatGPT App created with NextJs",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          {!session ? (
            <div className=" bg-[#212121] flex flex-col items-center justify-center h-screen px-2">


              <Login />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#11153a7a]   flex flex-col overflow-y-auto md:min-w-[20rem] sm:flex-row  sm:overflow-y-auto justify-center  ">
                {/*Sidebar */}
                <SideBar />
              </div>

              {/*Client provider - Notifications */}
              <ClientProvider />

              <div className="bg-[#2d2b55] flex-1  sm:overflow-y-auto  flex flex-col ">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
