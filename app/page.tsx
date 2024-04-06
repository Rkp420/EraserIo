"use client";

import { redirect } from "next/navigation";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";

export default function Home() {
  const { user }: any = useKindeBrowserClient();

  useEffect(() => {
    console.log("--", user);
  }, [user]);

  if(user){
    redirect('/dashboard');
  }
  
  return (
    <div>
      <Header user= {user}/>
      <Hero />
    </div>
  );
}
