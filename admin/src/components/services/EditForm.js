import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Context
import ServiceContext from '../../context/service/serviceContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

import Message from '../layout/Message';
import Progress from '../layout/Progress';
import Spinning from '../extras/Spinning';
import BodyEditor from './BodyEditor';

const EditForm = () => {
    const serviceContext = useContext(ServiceContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);
    const authContext = useContext(AuthContext);

    const { clearPcurrent, updateService, pcurrent, loading } = serviceContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();

        if (pcurrent && pcurrent !== null && loading === false) {
            setNewservice(pcurrent);
            setExisting(pcurrent.gallery);
        }

        // eslint-disable-next-line
    }, [serviceContext, pcurrent]);

    const [gallery, setGallery] = useState([]);
    const [file, setFile] = useState('');
    const [fileb, setFileb] = useState('');
    const [newimg, setNewimg] = useState('Choose File');
    const [opencontent, setOpencontent] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadedFiles, setUploadedFiles] = useState();
    const [uploadedBox, setUploadedBox] = useState({});
    const [uploadPer, setUploadPer] = useState(0);
    const [uploadsPer, setUploadsPer] = useState(0);
    const [uploadBox, setUploadBox] = useState(0);
    const [message, setMessage] = useState('');
    const [messagedos, setMessagedos] = useState('');
    const [messagetres, setMessagetres] = useState('');
    const [existing, setExisting] = useState();
    const [newservice, setNewservice] = useState({
        servicestatus: false,
        featuredimg: '',
        servicetitle: '',
        servicelink: '',
        menuname: '',
        servicesubt: '',
        servicedetails: '',
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
        servicestatus,
        featuredimg,
        servicetitle,
        menuname,
        servicesubt,
        servicedetails,
        extraboxes,
    } = newservice;

    const { subtitle, order, bodybox, img } = meta;

    const onChange = (e) => {
        setNewservice({
            ...newservice,
            [e.target.name]: e.target.value,
            menuname: menuname === '' ? servicetitle : menuname,
            servicelink: servicetitle
                .toLowerCase()
                .replace(/&/g, 'and')
                .replace(' - ', '')
                .replace('-', '')
                .replace(/ /g, '-')
                .replace(/[^\w-]/g, '')
                .replace(/[^]+-$/, ''),
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
        setNewservice({
            ...newservice,
            featuredimg: e.target.files[0].name
                .replace(/&/g, 'and')
                .replace(/-/g, ' ')
                .replace(/[^a-zA-Z0-9. ]/g, '')
                .replace(/ /g, '-')
                .toLowerCase(),
        });
    };

    const makeChange = (e) => {
        e.preventDefault();

        setMeta({
            ...meta,
            [e.target.name]: e.target.value,
        });
    };

    const transferBox = (id) => {
        if (subtitle !== '' || order !== 0 || bodybox !== '') {
            setAlert(
                'You must saved the current box before editing this one',
                'warning'
            );
            setLog({
                msg: `A metabox wasn't editing because another fields were not saved`,
                type: 'error',
            });
        } else {
            extraboxes &&
                extraboxes.map((el) => {
                    if (el._id === id) {
                        const newobj = extraboxes.filter(
                            (i) => el._id !== i._id
                        );

                        setNewservice({
                            ...newservice,
                            extraboxes: newobj,
                        });
                        setMeta(el);
                    }

                    return null;
                });
        }
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
                    setNewservice({
                        ...newservice,
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
            var existingimages = newservice.gallery;
            var response = [];

            res.data.map((img) => response.push({ fileName: img }));

            var finalarray = [...response, ...existingimages];

            setNewservice({
                ...newservice,
                gallery: finalarray,
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
            setNewservice({
                ...newservice,
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

    const onRemove = (e, id) => {
        e.preventDefault();
        const newobj = extraboxes.filter((i) => id !== i._id);

        setNewservice({
            ...newservice,
            extraboxes: newobj,
        });
    };

    const removeImage = (e, _id) => {
        e.preventDefault();
        const newobj = newservice.gallery.filter((i) => _id !== i._id);
        const secnewobj = existing.filter((i) => _id !== i._id);

        setNewservice({
            ...newservice,
            gallery: newobj,
        });
        setExisting(secnewobj);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            servicetitle === '' ||
            servicesubt === '' ||
            servicedetails === ''
        ) {
            document.querySelectorAll('.is-required').forEach((el) => {
                el.classList.add('required');
            });
            setAlert('One or more fields are empty', 'error');
            setLog({
                msg:
                    'One or more fields were empty when the user tried to add a new service',
                type: 'error',
            });
        } else if (subtitle !== '' || order !== 0 || bodybox !== '') {
            setAlert(`An extra box hasn't been saved yet`, 'warning');
            setLog({
                msg: `The user tried to edit <b>${pcurrent.servicetitle}</b> without saving an extra box.`,
                type: 'error',
            });
        } else {
            setAlert('Service Service Updated', 'success');
            setLog({
                msg: `Service service <b>${servicetitle}</b> updated`,
                type: 'success',
            });
            updateService(newservice);
            setOpencontent(false);
            setNewservice({
                servicestatus: false,
                featuredimg: '',
                servicetitle: '',
                servicelink: '',
                menuname: '',
                servicesubt: '',
                servicedetails: '',
                extraboxes: [],
                gallery: [],
            });
            setNewimg('Choose File');
            setUploadedFile({});
            setUploadedFiles();
            setUploadBox({});
            setMessage('');
            if (pcurrent) {
                var closemodal = document.getElementById('small-dialog');
                closemodal.classList.toggle('mfp-hide');
            }
            clearPcurrent();
            setGallery([]);
            setExisting();
            setFile('');
            setFileb('');
        }
    };

    const clearAll = () => {
        clearPcurrent();
    };

    return loading && pcurrent && pcurrent === null ? (
        <Spinning />
    ) : (
        <Fragment>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='content with-padding'>
                    <div className='row'>
                        <div className='col-xl-6'>
                            <div className='submit-field'>
                                <h5>Service Title</h5>
                                <input
                                    type='text'
                                    className='with-border is-required'
                                    name='servicetitle'
                                    value={servicetitle}
                                    onChange={(e) => onChange(e)}
                                    placeholder='Service Title'
                                />
                            </div>
                        </div>
                        <div className='col-xl-6'>
                            <div className='submit-field'>
                                <h5>Slug</h5>
                                <input
                                    type='text'
                                    name='servicelink'
                                    value={servicetitle
                                        .toLowerCase()
                                        .replace(/&/g, 'and')
                                        .replace(' - ', '')
                                        .replace('-', '')
                                        .replace(/ /g, '-')
                                        .replace(/[^\w-]/g, '')
                                        .replace(/[^\w-]+-$/, '')}
                                    onChange={onChange}
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
                                                name='servicestatus'
                                                checked={servicestatus}
                                                value={servicestatus}
                                                onChange={() => {
                                                    setNewservice({
                                                        ...newservice,
                                                        servicestatus: !servicestatus,
                                                    });
                                                }}
                                            />
                                            <span className='switch-button'></span>{' '}
                                            {servicestatus
                                                ? 'Published'
                                                : 'Draft'}
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
                                        title='This is how this service will populate in the navigation menu'
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
                                                setNewservice({
                                                    ...newservice,
                                                    menuname: e.target.value,
                                                })
                                            }
                                            placeholder='e.g. Home, About Us, Service Name'
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
                                            id='autocomplete-input'
                                            className='with-border is-required'
                                            type='text'
                                            name='servicesubt'
                                            value={servicesubt}
                                            onChange={(e) => onChange(e)}
                                            placeholder='e.g. The best service on your area'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-12'>
                            <div className='submit-field'>
                                <h5>Main Content</h5>
                                {!opencontent ? (
                                    <button
                                        className='button dark ripple-effect button-sliding-icon'
                                        onClick={() => {
                                            setOpencontent(true);
                                        }}
                                    >
                                        Click here to edit the main content{' '}
                                        <i className='icon-feather-edit-3'></i>
                                    </button>
                                ) : (
                                    <BodyEditor
                                        servicedetails={servicedetails}
                                        value={servicedetails}
                                        onChange={(e) => {
                                            setNewservice({
                                                ...newservice,
                                                servicedetails: e,
                                            });
                                        }}
                                    />
                                )}
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
                                        value={img}
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
                                Save Box <i className='icon-feather-plus'></i>
                            </button>
                        </div>

                        <div
                            className='content with-padding'
                            style={{ width: '100%', marginTop: 40 }}
                        >
                            {extraboxes &&
                                extraboxes.length > 0 &&
                                extraboxes
                                    .sort((a, b) => a.order - b.order)
                                    .map((eb, index) => (
                                        <div className='row' key={index}>
                                            <div className='col-xl-4'>
                                                <div className='uploaded-image'>
                                                    <img
                                                        src={`uploads/${eb.img}`}
                                                        alt={eb.subtitle}
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
                                                <h5>{eb.subtitle}</h5>
                                                <div
                                                    className='mb-body'
                                                    dangerouslySetInnerHTML={{
                                                        __html: eb.bodybox,
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
                                                    className='popup-with-zoom-anim button dark ripple-effect ico'
                                                    title='Edit Slider'
                                                    data-tippy-placement='top'
                                                    onClick={() =>
                                                        transferBox(eb._id)
                                                    }
                                                >
                                                    <i className='icon-feather-edit'></i>
                                                </button>
                                                <button
                                                    className='button red ripple-effect ico'
                                                    title='Remove Extra Box'
                                                    data-tippy-placement='top'
                                                    onClick={(e) =>
                                                        onRemove(e, eb._id)
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

                    <div className='row' style={{ marginTop: 40 }}>
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
                                        {featuredimg} - Replace File
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
                                        accept='image/jpeg,image/jpg,image/png,image/png'
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
                                            gallery && gallery.length
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
                                        uploadedFiles.map(
                                            (respo, index) =>
                                                respo !== null && (
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
                                                )
                                        )}
                                    {existing &&
                                        existing.length > 0 &&
                                        existing.map(
                                            (added, index) =>
                                                added !== null && (
                                                    <div
                                                        className='col-xl-3'
                                                        key={index}
                                                    >
                                                        <div className='uploaded-image'>
                                                            <img
                                                                src={`uploads/${added.fileName}`}
                                                                alt={
                                                                    added.fileName
                                                                }
                                                            />
                                                        </div>
                                                        <button
                                                            className='button red ripple-effect ico'
                                                            title='Remove Image'
                                                            data-tippy-placement='top'
                                                            onClick={(e) =>
                                                                removeImage(
                                                                    e,
                                                                    added._id
                                                                )
                                                            }
                                                        >
                                                            <i className='icon-feather-trash-2'></i>
                                                        </button>
                                                    </div>
                                                )
                                        )}
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
                                <i className='icon-feather-plus'></i> Edit
                                Service
                            </button>
                        </div>
                        <div className='col-xl-6'>
                            {pcurrent && (
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
        </Fragment>
    );
};

export default EditForm;
