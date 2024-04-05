"use client";
import AdBanner from "@/app/_components/Adbar";

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
  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

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

  return (
    <div className="p-8">
      <Header />

      <FileList />
      <AdBanner
        data-ad-slot="4796371341"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
