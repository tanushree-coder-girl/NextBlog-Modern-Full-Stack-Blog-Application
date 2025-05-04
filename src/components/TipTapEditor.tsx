"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Stack } from "@mui/material";
import {
  IconBold,
  IconItalic,
  IconList,
  IconH1,
  IconH2,
  IconCode,
} from "@tabler/icons-react";

const TipTapEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-green max-w-none min-h-[400px] max-h-[600px] overflow-y-auto px-4 py-2 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-md border border-gray-300 bg-white p-4 shadow-sm">
      {/* Toolbar */}
      <Stack direction="row" spacing={1} className="mb-4 flex-wrap">
        <Button
          variant={editor.isActive("bold") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          size="small"
        >
          <IconBold size={16} />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          size="small"
        >
          <IconItalic size={16} />
        </Button>
        <Button
          variant={
            editor.isActive("heading", { level: 1 }) ? "contained" : "outlined"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          size="small"
        >
          <IconH1 size={16} />
        </Button>
        <Button
          variant={
            editor.isActive("heading", { level: 2 }) ? "contained" : "outlined"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          size="small"
        >
          <IconH2 size={16} />
        </Button>
        <Button
          variant={editor.isActive("bulletList") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          size="small"
        >
          <IconList size={16} />
        </Button>
        <Button
          variant={editor.isActive("codeBlock") ? "contained" : "outlined"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          size="small"
        >
          <IconCode size={16} />
        </Button>
      </Stack>

      {/* Editor Area */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
