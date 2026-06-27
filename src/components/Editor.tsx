'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, List, ListOrdered } from 'lucide-react';

export default function Editor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="editor-toolbar">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`editor-btn ${editor.isActive('bold') ? 'is-active' : ''}`}><Bold size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`editor-btn ${editor.isActive('italic') ? 'is-active' : ''}`}><Italic size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`editor-btn ${editor.isActive('underline') ? 'is-active' : ''}`}><UnderlineIcon size={18} /></button>
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 8px' }}></div>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`editor-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}><AlignLeft size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`editor-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}><AlignCenter size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`editor-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}><AlignRight size={18} /></button>
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 8px' }}></div>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`editor-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}><List size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`editor-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}><ListOrdered size={18} /></button>
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 8px' }}></div>
        <button type="button" onClick={() => {
          const url = window.prompt('URL');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }} className={`editor-btn ${editor.isActive('link') ? 'is-active' : ''}`}><LinkIcon size={18} /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
