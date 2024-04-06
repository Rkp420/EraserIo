"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation } from "convex/react";
import { useEffect } from "react";
import FileList from "./_components/FileList";
import Header from "./_components/Header";

export default function Dashboard() {
  const { user }: any = useKindeBrowserClient();

  const convex = useConvex();

  const createUser = useMutation(api.user.createUser);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((resp) => {
        console.log(resp);
      });
    }
  };

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user, checkUser]);
  
  return (
    <div className="p-8">
      <Header />
      <FileList />
    </div>
  );
}
