import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image', 'video', 'formula'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'code'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'code',
];

interface OnChangeHandler {
  (value: string): void;
}

type Props = {
  value?: string;
  onChange: OnChangeHandler;
};

export const PostEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <>
      <ReactQuill
        style={{ width: 900, height: 150, marginBottom: 32 }}
        theme="snow"
        value={value || ''}
        modules={modules}
        formats={formats}
        onChange={(value) => onChange(value)}
      />
    </>
  );
};
