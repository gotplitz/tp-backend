import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

const ContentEditor = ({ expiration, onChange }) => {
    return (
        <div>
            <ReactQuill
                theme='snow'
                modules={ContentEditor.modules}
                formats={ContentEditor.formats}
                className='with-border'
                value={expiration}
                onChange={(expiration) => onChange(expiration)}
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
        [{ size: [] }],
        ['bold', 'underline', 'strike', 'blockquote'],
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
    'size',
    'bold',
    'underline',
    'strike',
    'blockquote',
    'list',
    'align',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

ContentEditor.propTypes = {
    expiration: PropTypes.string.isRequired,
};

export default ContentEditor;
