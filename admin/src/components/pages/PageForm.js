import React, { Fragment, useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Context
import PageContext from '../../context/page/pageContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

import Message from '../layout/Message';
import Progress from '../layout/Progress';

const PageForm = () => {
    const history = useHistory();
    const pageContext = useContext(PageContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { addPage } = pageContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    useEffect(() => {
        authContext.loadUser();

        // eslint-disable-next-line
    }, []);

    const [gallery, setGallery] = useState();
    const [file, setFile] = useState('');
    const [fileb, setFileb] = useState('');
    const [newimg, setNewimg] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadedFiles, setUploadedFiles] = useState();
    const [uploadedBox, setUploadedBox] = useState({});
    const [uploadPer, setUploadPer] = useState(0);
    const [uploadsPer, setUploadsPer] = useState(0);
    const [uploadBox, setUploadBox] = useState(0);
    const [message, setMessage] = useState('');
    const [messagedos, setMessagedos] = useState('');
    const [messagetres, setMessagetres] = useState('');
    const [newpage, setNewpage] = useState({
        pagestatus: false,
        featuredimg: 'big-placeholder.jpg',
        pagetitle: '',
        pagelink: '',
        menuname: '',
        pagesubt: '',
        pagedetails: '',
        extraboxes: [],
        gallery: [],
    });
    const [meta, setMeta] = useState({
        subtitle: '',
        order: 0,
        bodybox: '',
        img: '',
    });

    const {
        pagestatus,
        featuredimg,
        pagetitle,
        menuname,
        pagesubt,
        pagedetails,
        extraboxes,
    } = newpage;

    const { subtitle, order, bodybox, img } = meta;

    const onChange = (e) => {
        setNewpage({
            ...newpage,
            [e.target.name]: e.target.value,
            menuname: menuname === '' ? pagetitle : e.target.value,
            pagelink: pagetitle
                .toLowerCase()
                .replace(/&/g, 'and')
                .replace(' - ', '')
                .replace('-', '')
                .replace(/ /g, '-')
                .replace(/[^\w-]/g, '')
                .replace(/[^-]+-$/, ''),
        });
    };

    const makeChange = (e) => {
        e.preventDefault();

        setMeta({
            ...meta,
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
        setNewpage({
            ...newpage,
            featuredimg: e.target.files[0].name
                .replace(/&/g, 'and')
                .replace(/-/g, ' ')
                .replace(/[^a-zA-Z0-9. ]/g, '')
                .replace(/ /g, '-')
                .toLowerCase(),
        });
    };

    const boxChange = (e) => {
        setFileb(e.target.files[0]);
        setNewimg(e.target.files[0].name.replace(/ /g, '-'));
        setMeta({
            ...meta,
            img: e.target.files[0].name.replace(/ /g, '-'),
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
                    setNewpage({
                        ...newpage,
                        featuredimg: res.data.filePath.replace('uploads/', ''),
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

    const onGallery = async (e) => {
        e.preventDefault();
        const fdgal = new FormData();
        var newfile = document.getElementById('gallery');

        for (var x = 0; x < newfile.files.length; x++) {
            fdgal.append('gallery', newfile.files[x]);
        }

        try {
            const res = await axios.post('api/uploads/multiple', fdgal, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    setUploadsPer(
                        parseInt(
                            Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            )
                        )
                    );
                    // Clear percentage
                    setTimeout(() => setUploadsPer(0), 20000);
                },
            });

            setUploadedFiles(res.data);

            setNewpage({
                ...newpage,
                gallery: res.data,
            });
            setMessagetres('Files Uploaded Successfully', 'success');
        } catch (err) {
            if (err.response.status === 500) {
                setMessagetres('There was a problem with the server', 'error');
            } else {
                setMessagetres(err.response.data.msg, err.response.data.type);
            }
        }
    };

    const setImage = async (e) => {
        e.preventDefault();
        const fm = new FormData();
        fm.append('newimg', fileb);

        try {
            await axios
                .post('api/uploads', fm, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        setUploadBox(
                            parseInt(
                                Math.round(
                                    (progressEvent.loaded * 100) /
                                        progressEvent.total
                                )
                            )
                        );
                        // Clear percentage
                        setTimeout(() => setUploadBox(0), 20000);
                    },
                })
                .then((res) => {
                    setMeta({
                        ...meta,
                        img: res.data.filePath.replace('uploads/', ''),
                    });

                    const { newimg, filePath } = res.data;

                    setUploadedBox({ newimg, filePath });

                    setMessagedos('File Uploaded', 'success');
                })
                .catch((error) => {
                    setMessagedos('Error after uploading file', 'error');
                });
        } catch (err) {
            if (err.response.status === 500) {
                setMessagedos('There was a problem with the server', 'error');
            } else {
                setMessagedos(err.response.data.msg, err.response.data.type);
            }
        }
    };

    const addBox = (e) => {
        e.preventDefault();
        if (subtitle === '' || order === 0) {
            setAlert(
                `Make sure subtitle is not empty and order is not 0`,
                'warning'
            );
        } else {
            setNewpage({
                ...newpage,
                extraboxes: [...extraboxes, meta],
            });
            setMeta({
                subtitle: '',
                order: 0,
                bodybox: '',
                img: '',
            });
            setFileb('');
            setNewimg('Choose File');
            setUploadedBox({});
            setUploadBox(0);
            setMessagedos('');
        }
    };

    const onRemove = (e, index) => {
        e.preventDefault();
        const newobj = extraboxes.filter((i, itemIndex) => index !== itemIndex);

        setNewpage({
            ...newpage,
            extraboxes: newobj,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (pagetitle === '' || menuname === '' || pagedetails === '') {
            document.querySelectorAll('.is-required').forEach((el) => {
                el.classList.add('required');
            });
            setAlert('One or more fields are empty', 'error');
            setLog({
                msg:
                    'One or more fields were empty when the user tried to add a new page',
                type: 'error',
            });
        } else if (subtitle !== '' || order !== 0 || bodybox !== '') {
            setAlert(`An extra box hasn't been saved yet`, 'warning');
            setLog({
                msg: `The user tried to save a new post without saving the extra box.`,
                type: 'error',
            });
        } else {
            setAlert('New Page Page Added', 'success');
            setLog({
                msg: 'A new page property was added',
                type: 'success',
            });
            addPage(newpage);

            setNewpage({
                pagestatus: false,
                featuredimg: 'big-placeholder.jpg',
                pagetitle: '',
                pagelink: '',
                menuname: '',
                pagesubt: '',
                pagedetails: '',
                extraboxes: [],
            });
            setNewimg('Choose File');
            setUploadedFile({});
            setUploadedFiles();
            setUploadedBox({});
            setGallery([]);
            setMessage('');
            history.go(0);
        }
    };

    return (
        <Fragment>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='content with-padding padding-bottom-10'>
                    <div className='row'>
                        <div className='col-xl-6'>
                            <div className='submit-field'>
                                <h5>Page Page Title</h5>
                                <input
                                    type='text'
                                    className='with-border is-required'
                                    name='pagetitle'
                                    value={pagetitle}
                                    onChange={(e) => onChange(e)}
                                    placeholder='Page Page Title'
                                />
                            </div>
                        </div>
                        <div className='col-xl-6'>
                            <div className='submit-field'>
                                <h5>Slug</h5>
                                <input
                                    type='text'
                                    name='pagelink'
                                    value={pagetitle
                                        .toLowerCase()
                                        .replace(/&/g, 'and')
                                        .replace(' - ', '')
                                        .replace('-', '')
                                        .replace(/ /g, '-')
                                        .replace(/[^\w-]/g, '')
                                        .replace(/[^\w-]+-$/, '')}
                                    onChange={(e) => onChange(e)}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xl-2'>
                            <div className='submit-field'>
                                <h5>Visibility Status</h5>
                                <div className='switches-list'>
                                    <div className='switch-container'>
                                        <label className='switch'>
                                            <input
                                                type='checkbox'
                                                name='pagestatus'
                                                checked={pagestatus}
                                                value={pagestatus}
                                                onChange={() => {
                                                    setNewpage({
                                                        ...newpage,
                                                        pagestatus: !pagestatus,
                                                    });
                                                }}
                                            />
                                            <span className='switch-button'></span>{' '}
                                            {pagestatus ? 'Published' : 'Draft'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4'>
                            <div className='submit-field'>
                                <h5>
                                    Name in Navigation Menu{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title='This is how this page will populate in the navigation menu'
                                    ></i>
                                </h5>
                                <div className='input-with-icon'>
                                    <div id='autocomplete-container'>
                                        <input
                                            className='with-border is-required'
                                            type='text'
                                            name='menuname'
                                            value={menuname}
                                            onChange={(e) =>
                                                setNewpage({
                                                    ...newpage,
                                                    menuname: e.target.value,
                                                })
                                            }
                                            placeholder='e.g. Home, About Us, Page Name'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6'>
                            <div className='submit-field'>
                                <h5>
                                    Featured Subtitle{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title='A subheader or subtitle for h2 tag'
                                    ></i>
                                </h5>
                                <div className='input-with-icon'>
                                    <div id='autocomplete-container'>
                                        <input
                                            className='with-border'
                                            type='text'
                                            name='pagesubt'
                                            value={pagesubt}
                                            onChange={(e) => onChange(e)}
                                            placeholder='e.g. Post subtitle'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-12'>
                            <div className='submit-field'>
                                <h5>Main Content</h5>
                                <ReactQuill
                                    theme='snow'
                                    modules={PageForm.modules}
                                    formats={PageForm.formats}
                                    className='with-border is-required'
                                    value={pagedetails}
                                    onChange={(e) => {
                                        setNewpage({
                                            ...newpage,
                                            pagedetails: e,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xl-5'>
                            <div className='submit-field'>
                                <h5>
                                    Box Title{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title='Extra Box title'
                                    ></i>
                                </h5>
                                <div className='input-with-icon'>
                                    <div id='autocomplete-container'>
                                        <input
                                            className='with-border'
                                            type='text'
                                            name='subtitle'
                                            value={subtitle}
                                            onChange={(e) => makeChange(e)}
                                            placeholder='Extra content subtitle'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='submit-field'>
                                <h5>
                                    Order{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title='Position of this box'
                                    ></i>
                                </h5>
                                <div className='input-with-icon'>
                                    <div id='autocomplete-container'>
                                        <input
                                            className='with-border'
                                            type='number'
                                            name='order'
                                            value={order}
                                            onChange={(e) => makeChange(e)}
                                            placeholder='0'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-7'>
                            <div className='submit-field'>
                                <h5>
                                    Box Content{' '}
                                    <small>(HTML or Plain Text allowed)</small>{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title='Write the content for this extra box'
                                    ></i>
                                </h5>
                                <div className='input-with-icon'>
                                    <div id='autocomplete-container'>
                                        <textarea
                                            className='with-border'
                                            type='text'
                                            name='bodybox'
                                            value={bodybox}
                                            onChange={(e) => makeChange(e)}
                                            placeholder='Extra Box content'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-8'>
                            <div className='submit-field'>
                                <h5>Box Image</h5>
                                <div className='uploadButtonb margin-top-30'>
                                    <input
                                        className='uploadButtonb-input'
                                        type='text'
                                        name='img'
                                        value={newimg}
                                        onChange={(e) => onChange(e)}
                                    />
                                    <input
                                        className='uploadButtonb-input'
                                        type='file'
                                        accept='image/*'
                                        id='uploadb'
                                        name='fileb'
                                        onChange={boxChange}
                                    />
                                    <label
                                        className='uploadButton-button ripple-effect'
                                        htmlFor='uploadb'
                                    >
                                        {img} Select an Image
                                    </label>
                                    <span className='uploadButtonb-file-name'>
                                        The image should be at least 500px x
                                        350px in JPG, PNG or SVG format.
                                    </span>
                                </div>
                            </div>
                            <div className='submit-field'>
                                <div className='submit-field'>
                                    <Progress percentage={uploadBox} />
                                </div>
                                {messagedos ? (
                                    <Message msg={messagedos} />
                                ) : null}
                                <button
                                    onClick={setImage}
                                    className='button ripple-effect'
                                >
                                    Upload Image{' '}
                                    <i className='icon-feather-upload-cloud'></i>
                                </button>

                                {uploadedBox ? (
                                    <div className='col-xl-12'>
                                        <div className='uploaded-image'>
                                            <img
                                                src={uploadedBox.filePath}
                                                alt={uploadedBox.newimg}
                                            />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className='col-xl-4'>
                            <button
                                onClick={(e) => addBox(e)}
                                className='button ripple-effect'
                            >
                                Add Extra Content{' '}
                                <i className='icon-feather-plus'></i>
                            </button>
                        </div>

                        <div
                            className='content with-padding'
                            style={{ width: '100%' }}
                        >
                            {extraboxes.length > 0 &&
                                extraboxes
                                    .sort((a, b) => a.order - b.order)
                                    .map((meta, index) => (
                                        <div className='row' key={index}>
                                            <div className='col-xl-4'>
                                                <div className='uploaded-image'>
                                                    <img
                                                        src={`uploads/${meta.img}`}
                                                        alt={meta.subtitle}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className='col-xl-6'
                                                style={{
                                                    marginTop: 50,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                <h5>{meta.subtitle}</h5>
                                                <div
                                                    className='mb-body'
                                                    dangerouslySetInnerHTML={{
                                                        __html: meta.bodybox,
                                                    }}
                                                ></div>
                                            </div>
                                            <div
                                                className='col-xl-2'
                                                style={{
                                                    marginTop: 50,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                <button
                                                    className='button red ripple-effect ico'
                                                    title='Remove Extra Box'
                                                    data-tippy-placement='top'
                                                    onClick={(e) =>
                                                        onRemove(e, index)
                                                    }
                                                >
                                                    <i className='icon-feather-trash-2'></i>
                                                </button>
                                            </div>
                                            <div
                                                style={{
                                                    width: '100%',
                                                    height: 0.5,
                                                    backgroundColor: '#ececec',
                                                }}
                                            ></div>
                                        </div>
                                    ))}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='submit-field'>
                                <h5>Featured Image</h5>
                                <div className='uploadButton margin-top-30'>
                                    <input
                                        className='uploadButton-input'
                                        type='text'
                                        name='featuredimg'
                                        value={newimg}
                                        onChange={(e) => onChange(e)}
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
                                        {featuredimg} - Click to Replace File
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

                        <div className='col-xl-12'>
                            <div className='submit-field'>
                                <h5>Photo Gallery</h5>
                                <div className='uploadButton margin-top-30'>
                                    <input
                                        className='uploadButtons-input'
                                        type='file'
                                        accept='image/jpeg,image/jpg,image/png'
                                        id='gallery'
                                        name='gallery'
                                        onChange={(e) => {
                                            setGallery(e.target.files);
                                        }}
                                        multiple
                                        hidden
                                    />
                                    <label
                                        className='uploadButton-button ripple-effect'
                                        htmlFor='gallery'
                                    >
                                        {`Image Gallery (Selected ${
                                            gallery && gallery.length > 0
                                                ? gallery.length
                                                : '0'
                                        })`}
                                    </label>
                                    <span className='uploadButtons-file-name'>
                                        The images should be at least 700px x
                                        700px in JPG format.
                                    </span>
                                </div>
                            </div>
                            <div className='submit-field'>
                                {messagetres ? (
                                    <Message msg={messagetres} />
                                ) : null}
                                <button
                                    onClick={onGallery}
                                    className='button ripple-effect'
                                >
                                    Upload Images{' '}
                                    <i className='icon-feather-upload-cloud'></i>
                                </button>

                                <div className='row'>
                                    {uploadedFiles &&
                                        uploadedFiles.length > 0 &&
                                        uploadedFiles.map((respo, index) => (
                                            <div
                                                className='col-xl-3'
                                                key={index}
                                            >
                                                <div className='uploaded-image'>
                                                    <img
                                                        src={`uploads/${respo}`}
                                                        alt={respo}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className='submit-field'>
                                <Progress percentage={uploadsPer} />
                            </div>
                        </div>

                        <div className='col-xl-6'>
                            <button
                                type='submit'
                                className='button ripple-effect big'
                            >
                                <i className='icon-feather-plus'></i> Add Page
                                Page
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
PageForm.modules = {
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
PageForm.formats = [
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

export default PageForm;
