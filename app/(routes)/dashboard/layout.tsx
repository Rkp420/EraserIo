"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useCallback, useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";

import { FileListContext } from "@/app/_context/FileListContext";
import SideNav from "./_components/SideNav";
import { api } from "@/convex/_generated/api";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const [fileList_, setFileList_] = useState();
  const router = useRouter();

  const checkTeam = useCallback(async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      router.push("teams/create");
    }
  }, [user,convex,router]);

  useEffect(() => {
    user && checkTeam();
  }, [user, checkTeam]);

  return (
    <div>
      <FileListContext.Provider value={{ fileList_, setFileList_ }}>
        <div className="grid grid-cols-4">
          <div className="bg-white h-screen w-72 fixed">
            <SideNav />
          </div>
          <div className="col-span-4 ml-72">{children}</div>
        </div>
      </FileListContext.Provider>
    </div>
  );
}

export default DashboardLayout;
