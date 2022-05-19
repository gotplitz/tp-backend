import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useHistory } from 'react-router-dom';

// Context
import SliderContext from '../../context/slider/sliderContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

import Message from '../layout/Message';
import Progress from '../layout/Progress';

const SliderForm = () => {
    const history = useHistory();
    const sliderContext = useContext(SliderContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { addSlider, sliders } = sliderContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    const [file, setFile] = useState('');
    const [exist, setExist] = useState();
    const [newimg, setNewimg] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPer, setUploadPer] = useState(0);
    const [message, setMessage] = useState('');
    const [newslider, setNewSlider] = useState({
        order: 0,
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

    useEffect(() => {
        function SetSliders() {
            sliders &&
                sliders.filter(
                    (sl) =>
                        order !== 0 &&
                        sl.order.toString() === order &&
                        setExist(sl)
                );
        }

        return SetSliders();

        // eslint-disable-next-line
    }, [order]);

    const onChange = (e) => {
        setNewSlider({ ...newslider, [e.target.name]: e.target.value });
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
        setNewSlider({
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
                    setNewSlider({
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

        if (order === '' || title === '') {
            document.querySelectorAll('.is-required').forEach((el) => {
                el.classList.add('required');
            });
            setAlert('One or more fields are empty', 'error');
            setLog({
                msg:
                    'One or more fields were empty when the user tried to add a new slider',
                type: 'error',
            });
        } else if (order === 0) {
            document.getElementById('order').classList.add('required');
            setAlert(`Order number can't be zero`, 'error');
        } else if (exist && exist.order.toString() === order) {
            setAlert(
                'Only one slider is allowed with this order number',
                'error'
            );
        } else {
            addSlider(newslider);
            setAlert('Slider Added', 'success');
            setLog({ msg: 'A new slider was added', type: 'success' });
            setNewSlider({
                order: 0,
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

            history.push(`/sliders`);
        }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='content with-padding padding-bottom-10'>
                    <div className='row'>
                        <div className='col-xl-2'>
                            <div className='submit-field'>
                                <h5>Slider Order</h5>
                                <input
                                    type='number'
                                    className='with-border is-required'
                                    id='order'
                                    name='order'
                                    value={order}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className='col-xl-5'>
                            <div className='submit-field'>
                                <h5>Title</h5>
                                <input
                                    type='text'
                                    className='with-border is-required'
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
                                <h5>
                                    Sliders Details{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title='Add a secondary text to the slider as subtitle or intro'
                                    ></i>
                                </h5>
                                <ReactQuill
                                    theme='snow'
                                    modules={SliderForm.modules}
                                    formats={SliderForm.formats}
                                    className='with-border'
                                    value={moredetails}
                                    onChange={(e) => {
                                        setNewSlider({
                                            ...newslider,
                                            moredetails: e,
                                        });
                                    }}
                                />
                            </div>
                        </div>

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
                                <i className='icon-feather-plus'></i> Post
                                Slider
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
SliderForm.modules = {
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
SliderForm.formats = [
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

export default SliderForm;
