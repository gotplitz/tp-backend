import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

const IntroEditor = ({ newsintro, onChange }) => {
  return (
    <div>
      <ReactQuill
        theme='snow'
        modules={IntroEditor.modules}
        formats={IntroEditor.formats}
        className='with-border'
        value={newsintro}
        onChange={(newsintro) => onChange(newsintro)}
      />
    </div>
  );
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
IntroEditor.modules = {
  toolbar: [
    ['bold', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
IntroEditor.formats = [
  'bold',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

IntroEditor.propTypes = {
  newsintro: PropTypes.string.isRequired,
};

export default IntroEditor;
