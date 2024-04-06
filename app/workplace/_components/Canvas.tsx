import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { Excalidraw} from "@excalidraw/excalidraw";

import { api } from "@/convex/_generated/api";
import { FILE } from "@/app/(routes)/dashboard/_components/FileList";
function Canvas({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger]);
  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
    }).then((resp) => console.log(resp));
  };
  return (
    <div style={{ height: "670px" }} className="m-3">
      {fileData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas;
