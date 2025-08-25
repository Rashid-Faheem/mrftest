'use client'

import Menu from "@/components/Menu" ;
// import Navbar from "@/components/Navbar";
import { ThemeProvider } from  "@/components/ThemeProvider"
import { ModeToggle } from "@/components/ui/ModeToggle"
import Image from "next/image";
import Link from "next/link";
import { AuthProvider } from "../context/AuthContext";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import { useSession } from "@/components/useSession";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useSession();
  const [role, setRole] = useState<string | null>(null)
const [user, setUser] = useState<any>(null)
useEffect(() => {
  const session = localStorage.getItem("session")
  if (session) {
    const parsedUser = JSON.parse(session)
    setUser(parsedUser)
    setRole(parsedUser.role.toLowerCase()) // admin / teacher
  }
}, [])

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[20%] xl:w-[16%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/ZR_Solutions.png" className="lg:hidden" alt="logo" width={32} height={32} />
          
          <Image src="/ZR_Logo.png" className="hidden lg:block" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">ZR Solutions</span>
        </Link>
        
        {user && (
  <div className="flex flex-col mt-2 items-center mb-4 text-sm">
    <div className="w-12 h-12 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-bold text-lg">
      {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
    </div>
    <p className="mt-1 text-secondary-foreground">{user.name || user.email}</p>
    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
  </div>
)}
        <LogoutButton />
        <Menu />

        <hr className="mt-2" />
        <div className="mt-4">
        <ModeToggle  />
        </div>

      </div>
      {/* RIGHT */} 
      {/* bg-[#F7F8FA] */}
      <div className="w-[86%] md:w-[92%] lg:w-[80%] xl:w-[84%] bg-secondary overflow-scroll flex flex-col">
        {/* <Navbar /> */}
        <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
        <AuthProvider>{children}</AuthProvider>
              </ThemeProvider>
      </div>
    </div>
  );
}
