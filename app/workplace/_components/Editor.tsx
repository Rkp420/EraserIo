"use client";
import { useCallback, useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import EditorJS from "@editorjs/editorjs";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from "@editorjs/checklist";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import Warning from "@editorjs/warning";

import { toast } from "sonner";
import { FILE } from "@/app/(routes)/dashboard/_components/FileList";
import { api } from "@/convex/_generated/api";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};

function Editor({
  onSaveTrigger,
  fileId,
  fileData,
  updateTriggerSave,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
  updateTriggerSave: any;
}) {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
          config: {
            placeholder: "Enter a Header",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },

        paragraph: Paragraph,
        warning: Warning,
      },
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
      holder: "editorjs",
    });
    ref.current = editor;
    return () => editor.destroy(); // Clean up editor instance on component unmount
  }, [fileData]);

  const onSaveDocument = useCallback(() => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          })
            .then(() => {
              updateTriggerSave();
              toast("Document Updated!");
            })
            .catch((e) => {
              toast("Server Error!");
            });
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  }, [fileId, updateDocument, updateTriggerSave]);

  useEffect(() => {
    if (onSaveTrigger) {
      onSaveDocument();
    }
  }, [onSaveTrigger, onSaveDocument]);

  return <div id="editorjs" className="ml-10"></div>;
}

export default Editor;
