import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Context
import SliderContext from '../../context/slider/sliderContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

import Message from '../layout/Message';
import Progress from '../layout/Progress';
import Spinning from '../extras/Spinning';
import ContentEditor from './ContentEditor';
import { withRouter } from 'react-router';

const EditSlider = () => {
    const sliderContext = useContext(SliderContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { clearCurrent, updateSlider, scurrent, loading } = sliderContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();

        if (scurrent && scurrent !== null && loading === false) {
            setNewslider(scurrent);
        }

        // eslint-disable-next-line
    }, [sliderContext, scurrent]);

    const [file, setFile] = useState('');
    const [newimg, setNewimg] = useState('Choose File');
    const [opencontent, setOpencontent] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPer, setUploadPer] = useState(0);
    const [message, setMessage] = useState('');
    const [newslider, setNewslider] = useState({
        order: '',
        img: 'slider-placeholder.jpg',
        title: '',
        subtitle: '',
        btnone: '',
        btnlone: '',
        btntwo: '',
        btnltwo: '',
        moredetails: '',
    });

    const {
        order,
        img,
        title,
        subtitle,
        btnone,
        btnlone,
        btntwo,
        btnltwo,
        moredetails,
    } = newslider;

    const onChange = (e) => {
        setNewslider({
            ...newslider,
            [e.target.name]: e.target.value,
        });
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
        setNewslider({
            ...newslider,
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
            await axios
                .post('api/uploads', formData, {
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
                })
                .then((res) => {
                    setNewslider({
                        ...newslider,
                        img: res.data.filePath.replace('uploads/', ''),
                    });
                    const { newimg, filePath } = res.data;

                    setUploadedFile({ newimg, filePath });

                    setMessage('File Uploaded', 'success');
                })
                .catch((error) => {
                    setMessage('Error after uploading file', 'error');
                });
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
        if (title === '' || moredetails === '') {
            document.querySelectorAll('.with-border').forEach((el) => {
                el.classList.add('required');
            });
            setAlert('One or more fields are empty', 'error');
            setLog({
                msg:
                    'One or more fields were empty when the user tried to add a news item',
                type: 'error',
            });
        } else {
            setAlert('Post Item Edited', 'success');
            setLog({
                msg: `The slider <b>${title}</b> has been edited`,
                type: 'success',
            });
            updateSlider(newslider);
        }

        setOpencontent(false);

        setNewslider({
            order: '',
            img: 'slider-placeholder.jpg',
            title: '',
            subtitle: '',
            btnone: '',
            btnlone: '',
            btntwo: '',
            btnltwo: '',
            moredetails: '',
        });
        setNewimg('Choose File');
        setUploadedFile({});
        setMessage('');
        if (scurrent) {
            var closemodal = document.getElementById('small-dialog');
            closemodal.classList.toggle('mfp-hide');
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    };

    return loading && scurrent && scurrent === null ? (
        <Spinning />
    ) : (
        <form onSubmit={onSubmit}>
            <div className='content with-padding padding-bottom-10'>
                <div className='row'>
                    <div className='col-xl-2'>
                        <div className='submit-field'>
                            <h5>Slider Order</h5>
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
                                placeholder='Main Title'
                            />
                        </div>
                    </div>
                    <div className='col-xl-5'>
                        <div className='submit-field'>
                            <h5>Subtitle</h5>
                            <input
                                type='text'
                                className='with-border'
                                name='subtitle'
                                value={subtitle}
                                onChange={onChange}
                                placeholder='Tag line'
                            />
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xl-3'>
                        <div className='submit-field'>
                            <h5>
                                Button One Title
                                <i
                                    className='help-icon'
                                    data-tippy-placement='right'
                                    title='Add a secondary text to the slider as subtitle or intro'
                                ></i>
                            </h5>
                            <div className='input-with-icon'>
                                <div id='autocomplete-container'>
                                    <input
                                        id='autocomplete-input'
                                        className='with-border'
                                        type='text'
                                        name='btnone'
                                        value={btnone}
                                        onChange={onChange}
                                        placeholder='Secondary text'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-3'>
                        <div className='submit-field'>
                            <h5>
                                Button One Link
                                <i
                                    className='help-icon'
                                    data-tippy-placement='right'
                                    title='Add a secondary text to the slider as subtitle or intro'
                                ></i>
                            </h5>
                            <div className='input-with-icon'>
                                <div id='autocomplete-container'>
                                    <input
                                        id='autocomplete-input'
                                        className='with-border'
                                        type='text'
                                        name='btnlone'
                                        value={btnlone}
                                        onChange={onChange}
                                        placeholder='Secondary text'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-3'>
                        <div className='submit-field'>
                            <h5>
                                Button Two Title
                                <i
                                    className='help-icon'
                                    data-tippy-placement='right'
                                    title='Add a secondary text to the slider as subtitle or intro'
                                ></i>
                            </h5>
                            <div className='input-with-icon'>
                                <div id='autocomplete-container'>
                                    <input
                                        id='autocomplete-input'
                                        className='with-border'
                                        type='text'
                                        name='btntwo'
                                        value={btntwo}
                                        onChange={onChange}
                                        placeholder='Secondary text'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-3'>
                        <div className='submit-field'>
                            <h5>
                                Button Two Link
                                <i
                                    className='help-icon'
                                    data-tippy-placement='right'
                                    title='Add a secondary text to the slider as subtitle or intro'
                                ></i>
                            </h5>
                            <div className='input-with-icon'>
                                <div id='autocomplete-container'>
                                    <input
                                        id='autocomplete-input'
                                        className='with-border'
                                        type='text'
                                        name='btnltwo'
                                        value={btnltwo}
                                        onChange={onChange}
                                        placeholder='Secondary text'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xl-12'>
                        <div className='submit-field'>
                            <h5>Slider Extra Content</h5>
                            {!opencontent ? (
                                <button
                                    className='button dark ripple-effect button-sliding-icon'
                                    onClick={() => {
                                        setOpencontent(true);
                                    }}
                                >
                                    Edit the Content{' '}
                                    <i className='icon-feather-edit-3'></i>
                                </button>
                            ) : (
                                <ContentEditor
                                    moredetails={moredetails}
                                    value={moredetails}
                                    onChange={(e) => {
                                        setNewslider({
                                            ...newslider,
                                            moredetails: e,
                                        });
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-xl-12'>
                        <div className='submit-field'>
                            <h5>Slider Background</h5>
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
                                    This image should be at least 1400px x 800px
                                    in JPG format.
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
                            <i className='icon-feather-plus'></i> Edit Slider
                        </button>
                    </div>
                    <div className='col-xl-6'>
                        {scurrent && (
                            <Fragment>
                                <button
                                    type='submit'
                                    className='button gray ripple-effect big'
                                    onClick={clearAll}
                                >
                                    <i className='icon-feather-delete'></i>{' '}
                                    <span style={{ marginLeft: 10 }}>
                                        Clear Form
                                    </span>
                                </button>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default withRouter(EditSlider);
