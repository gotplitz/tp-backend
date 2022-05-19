import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

const ContentEditor = ({ newscontent, onChange }) => {
    return (
        <div>
            <ReactQuill
                theme='snow'
                modules={ContentEditor.modules}
                formats={ContentEditor.formats}
                className='with-border'
                value={newscontent}
                onChange={(newscontent) => onChange(newscontent)}
            />
        </div>
    );
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
ContentEditor.modules = {
    toolbar: [
        ['bold', 'underline', 'strike', 'blockquote'],
        [{ header: [2, 3, 4, 5, 6, false] }],
        [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
        ],
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
ContentEditor.formats = [
    'bold',
    'underline',
    'align',
    'strike',
    'blockquote',
    'header',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

ContentEditor.propTypes = {
    newscontent: PropTypes.string.isRequired,
};

export default ContentEditor;
