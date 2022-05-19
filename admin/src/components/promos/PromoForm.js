import React, { Fragment, useState, useContext } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { withRouter } from 'react-router';

// Context
import PromoContext from '../../context/promo/promoContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

import Message from '../layout/Message';
import Progress from '../layout/Progress';

const PromoForm = ({ history }) => {
    const promoContext = useContext(PromoContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { addPromo } = promoContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    const [file, setFile] = useState('');
    const [newimg, setNewimg] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPer, setUploadPer] = useState(0);
    const [message, setMessage] = useState('');
    const [newpromo, setNewPromo] = useState({
        order: '',
        img: 'promo-placeholder.jpg',
        title: '',
        amount: '',
        expiration: '',
    });

    const { order, img, title, amount, expiration } = newpromo;

    const onChange = (e) => {
        setNewPromo({ ...newpromo, [e.target.name]: e.target.value });
    };

    const inChange = (e) => {
        setFile(e.target.files[0]);
        setNewimg(
            e.target.files[0].name
                .replace(/&/g, 'and')
                .replace(/-/g, ' ')
                .replace(/[^a-zA-Z0-9. ]/g, '')
                .replace(/ /g, '-')
                .toLowerCase()
        );
        setNewPromo({
            ...newpromo,
            img: e.target.files[0].name
                .replace(/&/g, 'and')
                .replace(/-/g, ' ')
                .replace(/[^a-zA-Z0-9. ]/g, '')
                .replace(/ /g, '-')
                .toLowerCase(),
        });
    };

    const onPress = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('newimg', file);

        try {
            const res = await axios.post('api/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    setUploadPer(
                        parseInt(
                            Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            )
                        )
                    );
                    // Clear percentage
                    setTimeout(() => setUploadPer(0), 20000);
                },
            });

            const { newimg, filePath } = res.data;

            setUploadedFile({ newimg, filePath });
            setMessage('File Uploaded', 'success');
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server', 'error');
            } else {
                setMessage(err.response.data.msg, err.response.data.type);
            }
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (order === '' || title === '' || amount === '') {
            document.querySelectorAll('.with-border').forEach((el) => {
                el.classList.add('required');
            });
            setAlert('One or more fields are empty', 'error');
            setLog({
                msg:
                    'One or more fields were empty when the user tried to add a new promo',
                type: 'error',
            });
        } else {
            setAlert('Promo Added', 'success');
            setLog({ msg: 'A new promo was added', type: 'success' });
            addPromo(newpromo);
            setNewPromo({
                order: '',
                img: 'promo-placeholder.jpg',
                title: '',
                amount: '',
                expiration: '',
            });
            setNewimg('Choose File');
            setUploadedFile({});
            setMessage('');
            history.push(`/promos`);
        }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='content with-padding padding-bottom-10'>
                    <div className='row'>
                        <div className='col-xl-2'>
                            <div className='submit-field'>
                                <h5>Promo Order</h5>
                                <input
                                    type='number'
                                    className='with-border'
                                    name='order'
                                    value={order}
                                    onChange={onChange}
                                    placeholder='0'
                                />
                            </div>
                        </div>
                        <div className='col-xl-5'>
                            <div className='submit-field'>
                                <h5>Title</h5>
                                <input
                                    type='text'
                                    className='with-border'
                                    name='title'
                                    value={title}
                                    onChange={onChange}
                                    placeholder='Offer Name'
                                />
                            </div>
                        </div>
                        <div className='col-xl-5'>
                            <div className='submit-field'>
                                <h5>
                                    Amount{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title='You can write they and amount of discount here, e.g. $200 OFF or 5% OFF'
                                    ></i>
                                </h5>
                                <div className='input-with-icon'>
                                    <div id='autocomplete-container'>
                                        <input
                                            id='autocomplete-input'
                                            className='with-border'
                                            type='text'
                                            name='amount'
                                            value={amount}
                                            onChange={onChange}
                                            placeholder='e.g. 5% OFF or $50 OFF'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-xl-12'>
                            <div className='submit-field'>
                                <h5>
                                    Expiration Date and Restrictions{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title={`Add expiration or 'Doesn't Expire' and other terms and conditions`}
                                    ></i>
                                </h5>
                                <ReactQuill
                                    theme='snow'
                                    modules={PromoForm.modules}
                                    formats={PromoForm.formats}
                                    className='with-border'
                                    value={expiration}
                                    onChange={(e) => {
                                        setNewPromo({
                                            ...newpromo,
                                            expiration: e,
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div className='col-xl-12'>
                            <div className='submit-field'>
                                <h5>Promo Background</h5>
                                <div className='uploadButton margin-top-30'>
                                    <input
                                        className='uploadButton-input'
                                        type='text'
                                        name='img'
                                        value={newimg}
                                        onChange={onChange}
                                    />
                                    <input
                                        className='uploadButton-input'
                                        type='file'
                                        accept='image/jpeg,image/jpg'
                                        id='upload'
                                        name='file'
                                        onChange={inChange}
                                    />
                                    <label
                                        className='uploadButton-button ripple-effect'
                                        htmlFor='upload'
                                    >
                                        {img} - Replace File
                                    </label>
                                    <span className='uploadButton-file-name'>
                                        This image should be at least 1400px x
                                        800px in JPG format.
                                    </span>
                                </div>
                            </div>
                            <div className='submit-field'>
                                {message ? <Message msg={message} /> : null}
                                <button
                                    onClick={onPress}
                                    className='button ripple-effect'
                                >
                                    Upload Image{' '}
                                    <i className='icon-feather-upload-cloud'></i>
                                </button>

                                {uploadedFile ? (
                                    <div className='col-xl-12'>
                                        <div className='uploaded-image'>
                                            <img
                                                src={uploadedFile.filePath}
                                                alt={uploadedFile.newimg}
                                            />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            <div className='submit-field'>
                                <Progress percentage={uploadPer} />
                            </div>
                        </div>

                        <div className='col-xl-6'>
                            <button
                                type='submit'
                                className='button ripple-effect big'
                            >
                                <i className='icon-feather-plus'></i> Add Promo
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
PromoForm.modules = {
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
PromoForm.formats = [
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

export default withRouter(PromoForm);
