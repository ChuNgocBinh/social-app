import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Ckeditor({ value, setValue }) {
  // const [value, setValue] = React.useState('');
  // console.log(value)

  return (
    <div className="mt-2">
      <h4>Content</h4>
      <ReactQuill theme="snow" value={value} onChange={setValue}/>
    </div>
  );
}
