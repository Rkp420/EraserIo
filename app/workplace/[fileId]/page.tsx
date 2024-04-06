"use client";
import React, { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import Canvas from "../_components/Canvas";
import { FILE } from "@/app/(routes)/dashboard/_components/FileList";
import WorksplaceHeader from "../_components/WorkPlaceHeader";
import dynamic from "next/dynamic";
const DynamicEditor = dynamic(() => import("../_components/Editor"), {
  ssr: false,
});
function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>(null);
  useEffect(() => {
    console.log("FILEID", params.fileId);
    params.fileId && getFileData();

    return setFileData(null);
  }, []);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, {
      _id: params.fileId,
    });
    setFileData(result);
  };
  return (
    <div>
      <WorksplaceHeader onSave={() => setTriggerSave(true)} />

      {/* Workspace Layout  */}
      <div
        className="grid grid-cols-1
      md:grid-cols-2"
      >
        {/* Document  */}
        <div className=" h-screen">
          <DynamicEditor
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
            updateTriggerSave={() => setTriggerSave(false)}
          />
        </div>
        {/* Whiteboard/canvas  */}
        <div className=" h-screen border-l">
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
