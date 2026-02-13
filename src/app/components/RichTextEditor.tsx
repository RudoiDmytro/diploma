"use client";

import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

interface RichTextEditorProps {
  onChange?: (value: string) => void;
  editorClassName?: string;
}

export default function RichTextEditor({
  onChange,
  editorClassName,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div>
      <div className="flex gap-1 border rounded-t-md p-1 bg-muted">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          B
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          I
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          U
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          •
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          1.
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const url = window.prompt("URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          active={editor.isActive("link")}
        >
          🔗
        </ToolbarButton>
      </div>
      <EditorContent
        editor={editor}
        className={cn(
          "border border-t-0 rounded-b-md px-2 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 prose prose-sm max-w-none",
          editorClassName
        )}
      />
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-2 py-1 rounded text-sm font-medium",
        active ? "bg-primary text-primary-foreground" : "hover:bg-accent"
      )}
    >
      {children}
    </button>
  );
}
