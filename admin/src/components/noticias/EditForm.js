import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import axios from 'axios';

// Context
import NoticiaContext from '../../context/noticia/noticiaContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

import Message from '../layout/Message';
import Progress from '../layout/Progress';
import Spinning from '../extras/Spinning';
import ContentEditor from './ContentEditor';
import IntroEditor from './IntroEditor';

const EditForm = () => {
    const noticiaContext = useContext(NoticiaContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { clearNcurrent, updateNoticia, ncurrent, loading } = noticiaContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();

        if (ncurrent && ncurrent !== null && loading === false) {
            setNewnoticia(ncurrent);
        }

        // eslint-disable-next-line
    }, [noticiaContext, ncurrent]);

    const [file, setFile] = useState('');
    const [newimg, setNewimg] = useState('Choose File');
    const [opencontent, setOpencontent] = useState(false);
    const [openintro, setOpenintro] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPer, setUploadPer] = useState(0);
    const [message, setMessage] = useState('');
    const [newnoticia, setNewnoticia] = useState({
        newsstatus: false,
        featuredimg: 'big-placeholder.jpg',
        newstitle: '',
        newslink: '',
        newscat: [],
        newsintro: '',
        newscontent: '',
    });

    const options = ['News', 'Blog Post', 'Press'];
    const slectstyle = {
        chips: { background: '#6A479C' },
        searchBox: {
            border: 'none',
        },
    };

    const {
        newsstatus,
        featuredimg,
        newstitle,
        newsintro,
        newscontent,
        newscat,
    } = newnoticia;

    const addSelect = (e) => {
        setNewnoticia({
            ...newnoticia,
            newscat: e,
        });
    };

    const removeSelect = (e) => {
        setNewnoticia({
            ...newnoticia,
            newscat: e,
        });
    };

    const selectedValues = newscat.map((newscat) => newscat);

    const onChange = (e) => {
        setNewnoticia({
            ...newnoticia,
            [e.target.name]: e.target.value,
            newslink: e.target.value
                .replace(/&/g, 'and')
                .replace('?', '')
                .replace(/[^a-zA-Z0-9 ]/g, '')
                .replace(/ /g, '-')
                .toLowerCase(),
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
        setNewnoticia({
            ...newnoticia,
            featuredimg: e.target.files[0].name
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
                    setNewnoticia({
                        ...newnoticia,
                        featuredimg: res.data.filePath.replace('uploads/', ''),
                    });
                    const { newimg, filePath } = res.data;

                    setUploadedFile({ newimg, filePath });

                    setMessage('File Uploaded', 'success');
                })
                .catch((error) => {
                    console.log(error);
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
        if (
            newstitle === '' ||
            newsintro === '' ||
            newscontent === '' ||
            newscat === []
        ) {
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
            setLog({ msg: 'A news item was edited', type: 'success' });
            updateNoticia(newnoticia);
            setOpencontent(false);
            setOpenintro(false);
            setNewnoticia({
                newsstatus: false,
                featuredimg: 'big-placeholder.jpg',
                newstitle: '',
                newslink: '',
                newscat: [],
                newsintro: '',
                newscontent: '',
            });
            setNewimg('Choose File');
            setUploadedFile({});
            setMessage('');
            if (ncurrent) {
                var closemodal = document.getElementById('small-dialog');
                closemodal.classList.toggle('mfp-hide');
            }
            clearNcurrent();
        }
    };

    const clearAll = () => {
        if (ncurrent) {
            var closemodal = document.getElementById('small-dialog');
            closemodal.classList.toggle('mfp-hide');
        }

        clearNcurrent();
    };

    return loading && ncurrent && ncurrent === null ? (
        <Spinning />
    ) : (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='content with-padding padding-bottom-10'>
                    <div className='row'>
                        <div className='col-xl-2'>
                            <div className='submit-field'>
                                <h5>Visibility Status</h5>
                                <div className='switches-list'>
                                    <div className='switch-container'>
                                        <label className='switch'>
                                            <input
                                                type='checkbox'
                                                name='newsstatus'
                                                checked={newsstatus}
                                                value={newsstatus}
                                                onChange={() => {
                                                    setNewnoticia({
                                                        ...newnoticia,
                                                        newsstatus: !newsstatus,
                                                    });
                                                }}
                                            />
                                            <span className='switch-button'></span>{' '}
                                            {newsstatus ? 'Published' : 'Draft'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-10'>
                            <div className='submit-field'>
                                <h5>Post Title</h5>
                                <input
                                    type='text'
                                    className='with-border'
                                    name='newstitle'
                                    value={newstitle}
                                    onChange={onChange}
                                    placeholder='Noticia Title'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xl-2'>
                            <div className='submit-field'>
                                <h5>Post Categories</h5>

                                <Multiselect
                                    options={options}
                                    isObject={false}
                                    onSelect={(e) => addSelect(e)}
                                    onRemove={(e) => removeSelect(e)}
                                    selectedValues={selectedValues || ''}
                                    closeIcon='cancel'
                                    style={slectstyle}
                                />
                            </div>
                        </div>

                        <div className='col-xl-10'>
                            <div className='submit-field'>
                                <h5>Link</h5>
                                <input
                                    type='text'
                                    name='newslink'
                                    value={newstitle
                                        .replace(/&/g, 'and')
                                        .replace('?', '')
                                        .replace(/[^a-zA-Z0-9 ]/g, '')
                                        .replace(/ /g, '-')
                                        .toLowerCase()}
                                    onChange={(e) => onChange(e)}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='submit-field'>
                                <h5>Post Intro</h5>
                                {!openintro ? (
                                    <button
                                        className='button dark ripple-effect button-sliding-icon'
                                        onClick={() => {
                                            setOpenintro(true);
                                        }}
                                    >
                                        Edit the Intro{' '}
                                        <i className='icon-feather-edit-3'></i>
                                    </button>
                                ) : (
                                    <IntroEditor
                                        newsintro={newsintro}
                                        value={newsintro}
                                        onChange={(e) => {
                                            setNewnoticia({
                                                ...newnoticia,
                                                newsintro: e,
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
                                <h5>Post Content</h5>
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
                                        newscontent={newscontent}
                                        value={newscontent}
                                        onChange={(e) => {
                                            setNewnoticia({
                                                ...newnoticia,
                                                newscontent: e,
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
                                <h5>Post Background</h5>
                                <div className='uploadButton margin-top-30'>
                                    <input
                                        className='uploadButton-input'
                                        type='text'
                                        name='featuredimg'
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

                        <div className='col-xl-6'>
                            <button
                                type='submit'
                                className='button ripple-effect big'
                            >
                                <i className='icon-feather-save'></i>{' '}
                                <span style={{ marginLeft: 10 }}>
                                    Save Changes
                                </span>
                            </button>
                        </div>
                        <div className='col-xl-6'>
                            {ncurrent && (
                                <Fragment>
                                    <a
                                        href='#!'
                                        className='button gray ripple-effect big'
                                        onClick={clearAll}
                                        style={{ textAlign: 'center' }}
                                    >
                                        <i className='icon-feather-x'></i>{' '}
                                        <span style={{ marginLeft: 10 }}>
                                            Cancel Changes
                                        </span>
                                    </a>
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
