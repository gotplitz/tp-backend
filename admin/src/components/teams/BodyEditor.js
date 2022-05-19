import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

const BodyEditor = ({ teamdetails, onChange }) => {
    return (
        <div>
            <ReactQuill
                theme='snow'
                modules={BodyEditor.modules}
                formats={BodyEditor.formats}
                className='with-border'
                value={teamdetails}
                onChange={(teamdetails) => onChange(teamdetails)}
            />
        </div>
    );
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
BodyEditor.modules = {
    toolbar: [
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
        ['link', 'image'],
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
BodyEditor.formats = [
    'bold',
    'underline',
    'strike',
    'blockquote',
    'align',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

BodyEditor.propTypes = {
    teamdetails: PropTypes.string.isRequired,
};

export default BodyEditor;
