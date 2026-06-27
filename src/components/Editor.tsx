'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import { Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, List, ListOrdered, Image as ImageIcon } from 'lucide-react';

export default function Editor({ content, onChange }: { content: string, onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      FontFamily,
      Image,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addImage = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('/api/blog/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          editor.chain().focus().setImage({ src: data.url }).run();
        } else {
          alert('Failed to upload image');
        }
      } catch (err) {
        alert('Error uploading image');
      }
    };
    fileInput.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="editor-toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
        <select 
          className="input-field" 
          style={{ padding: '6px 12px', width: 'auto', marginRight: '8px' }}
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          value={editor.getAttributes('textStyle').fontFamily || ''}
        >
          <option value="">Default Font</option>
          <option value="Inter">Inter</option>
          <option value="Comic Sans MS, Comic Sans">Comic Sans</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="cursive">Cursive</option>
        </select>
        
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 4px' }}></div>
        
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`editor-btn ${editor.isActive('bold') ? 'is-active' : ''}`}><Bold size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`editor-btn ${editor.isActive('italic') ? 'is-active' : ''}`}><Italic size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`editor-btn ${editor.isActive('underline') ? 'is-active' : ''}`}><UnderlineIcon size={18} /></button>
        
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 4px' }}></div>
        
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`editor-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}><AlignLeft size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`editor-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}><AlignCenter size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`editor-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}><AlignRight size={18} /></button>
        
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 4px' }}></div>
        
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`editor-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}><List size={18} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`editor-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}><ListOrdered size={18} /></button>
        
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 4px' }}></div>
        
        <button type="button" onClick={() => {
          const url = window.prompt('URL');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }} className={`editor-btn ${editor.isActive('link') ? 'is-active' : ''}`}><LinkIcon size={18} /></button>
        
        <button type="button" onClick={addImage} className="editor-btn"><ImageIcon size={18} /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
