import React, { Fragment, useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// Context
import TeamContext from '../../context/team/teamContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

import Message from '../layout/Message';
import Progress from '../layout/Progress';

const TeamForm = () => {
    const history = useHistory();
    const teamContext = useContext(TeamContext);
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { addTeam } = teamContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    useEffect(() => {
        authContext.loadUser();

        // eslint-disable-next-line
    }, []);

    const [file, setFile] = useState('');
    const [newimg, setNewimg] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPer, setUploadPer] = useState(0);
    const [message, setMessage] = useState('');
    const [newteam, setNewteam] = useState({
        teamstatus: false,
        featuredimg: 'big-placeholder.jpg',
        teamtitle: '',
        teamlink: '',
        teamsubt: '',
        teamdetails: '',
        extraboxes: [],
    });
    const [meta, setMeta] = useState({
        subtitle: '',
        order: 0,
        bodybox: '',
    });

    const {
        teamstatus,
        featuredimg,
        teamtitle,
        teamsubt,
        teamdetails,
        extraboxes,
    } = newteam;

    const { subtitle, order, bodybox } = meta;

    const onChange = (e) => {
        setNewteam({
            ...newteam,
            [e.target.name]: e.target.value,
            teamlink: e.target.value
                .replace(/&/g, 'and')
                .replace(/[!-/:-@[-^`'’{-~]+/g, '')
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
        setNewteam({
            ...newteam,
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
                    setNewteam({
                        ...newteam,
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

    const addBox = (e) => {
        e.preventDefault();
        setNewteam({
            ...newteam,
            extraboxes: [...extraboxes, meta],
        });
        setMeta({
            subtitle: '',
            order: 0,
            bodybox: '',
        });
    };

    const onRemove = (e, index) => {
        e.preventDefault();
        const newobj = extraboxes.filter((i, itemIndex) => index !== itemIndex);

        setNewteam({
            ...newteam,
            extraboxes: newobj,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (teamtitle === '') {
            document.querySelectorAll('[required]').forEach((el) => {
                el.classList.add('required');
            });
            setAlert('One or more fields are empty', 'error');
            setLog({
                msg:
                    'One or more fields were empty when the user tried to add a new team',
                type: 'error',
            });
        } else if (subtitle !== '' || order !== 0 || bodybox !== '') {
            setAlert(`An extra box hasn't been saved yet`, 'warning');
            setLog({
                msg: `The user tried to save a new post without saving the extra box.`,
                type: 'error',
            });
        } else {
            setAlert('New Team Added', 'success');
            setLog({ msg: 'A new team was added', type: 'success' });
            addTeam(newteam);

            setNewteam({
                teamstatus: false,
                featuredimg: 'big-placeholder.jpg',
                teamtitle: '',
                teamlink: '',
                teamsubt: '',
                teamdetails: '',
                extraboxes: [],
            });
            setNewimg('Choose File');
            setUploadedFile({});
            setMessage('');
            history.go(0);
        }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='content with-padding padding-bottom-10'>
                    <div className='row'>
                        <div className='col-xl-6'>
                            <div className='submit-field'>
                                <h5>Name</h5>
                                <input
                                    type='text'
                                    className='with-border'
                                    name='teamtitle'
                                    value={teamtitle}
                                    onChange={onChange}
                                    placeholder='Full Name'
                                    required
                                />
                            </div>
                        </div>
                        <div className='col-xl-6'>
                            <div className='submit-field'>
                                <h5>Slug</h5>
                                <input
                                    type='text'
                                    name='teamlink'
                                    value={teamtitle
                                        .replace(/&/g, 'and')
                                        .replace(/[!-/:-@[-^`'’{-~]+/g, '')
                                        .replace(/ /g, '-')
                                        .toLowerCase()}
                                    onChange={(e) => onChange(e)}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-xl-3'>
                            <div className='submit-field'>
                                <h5>Visibility Status</h5>
                                <div className='switches-list'>
                                    <div className='switch-container'>
                                        <label className='switch'>
                                            <input
                                                type='checkbox'
                                                name='teamstatus'
                                                checked={teamstatus}
                                                value={teamstatus}
                                                onChange={() => {
                                                    setNewteam({
                                                        ...newteam,
                                                        teamstatus: !teamstatus,
                                                    });
                                                }}
                                            />
                                            <span className='switch-button'></span>{' '}
                                            {teamstatus ? 'Published' : 'Draft'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-9'>
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
                                            name='teamsubt'
                                            value={teamsubt}
                                            onChange={onChange}
                                            placeholder='Position or Title'
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
                                    modules={TeamForm.modules}
                                    formats={TeamForm.formats}
                                    className='with-border'
                                    value={teamdetails}
                                    onChange={(e) => {
                                        setNewteam({
                                            ...newteam,
                                            teamdetails: e,
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
                                        title='Extra Content Title'
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
                                        title='Block order'
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
                                        title='Extra Box Content'
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
                                            placeholder='Extra content body'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-12'>
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
                                            <div
                                                className='col-xl-10'
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
                                        {featuredimg} - Click to Replace File
                                    </label>
                                    <span className='uploadButton-file-name'>
                                        The image should be at least 1000px x
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
                                <i className='icon-feather-plus'></i> Add Team
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
TeamForm.modules = {
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
TeamForm.formats = [
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
];

export default TeamForm;
