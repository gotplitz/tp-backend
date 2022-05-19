import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Context
import TeamContext from '../../context/team/teamContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

import Message from '../layout/Message';
import Progress from '../layout/Progress';
import Spinning from '../extras/Spinning';
import BodyEditor from './BodyEditor';

const EditForm = () => {
    const teamContext = useContext(TeamContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);
    const authContext = useContext(AuthContext);

    const { clearPcurrent, updateTeam, pcurrent, loading } = teamContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();

        if (pcurrent && pcurrent !== null && loading === false) {
            setNewteam(pcurrent);
        }

        // eslint-disable-next-line
    }, [teamContext, pcurrent]);

    const [opencontent, setOpencontent] = useState(false);
    const [file, setFile] = useState('');
    const [newimg, setNewimg] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPer, setUploadPer] = useState(0);
    const [message, setMessage] = useState('');
    const [newteam, setNewteam] = useState({
        teamstatus: false,
        featuredimg: '',
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

                        setNewteam({
                            ...newteam,
                            extraboxes: newobj,
                        });
                        setMeta(el);
                    }

                    return null;
                });
        }
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

    const onRemove = (e, id) => {
        e.preventDefault();
        const newobj = extraboxes.filter((i) => id !== i._id);

        setNewteam({
            ...newteam,
            extraboxes: newobj,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (teamtitle === '') {
            document.querySelectorAll('.with-border').forEach((el) => {
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
                msg: `The user tried to edit <b>${pcurrent.teamtitle}</b> without saving an extra box.`,
                type: 'error',
            });
        } else {
            setAlert('Team Page Updated', 'success');
            setLog({
                msg: `Team page <b>${teamtitle}</b> updated`,
                type: 'success',
            });
            updateTeam(newteam);
            setOpencontent(false);
            setNewteam({
                teamstatus: false,
                featuredimg: '',
                teamtitle: '',
                teamlink: '',
                teamsubt: '',
                teamdetails: '',
            });
            setNewimg('Choose File');
            setUploadedFile({});
            setMessage('');
            if (pcurrent) {
                var closemodal = document.getElementById('small-dialog');
                closemodal.classList.toggle('mfp-hide');
            }
            clearPcurrent();
        }
    };

    const clearAll = () => {
        setNewteam({
            teamstatus: false,
            featuredimg: '',
            teamtitle: '',
            teamlink: '',
            teamsubt: '',
            teamdetails: '',
        });
        clearPcurrent();
    };

    return loading && pcurrent && pcurrent === null ? (
        <Spinning />
    ) : (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className='content with-padding'>
                    <div className='row'>
                        <div className='col-xl-6'>
                            <div className='submit-field'>
                                <h5>Team Title</h5>
                                <input
                                    type='text'
                                    className='with-border'
                                    name='teamtitle'
                                    value={teamtitle}
                                    onChange={(e) => onChange(e)}
                                    placeholder='Team Title'
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
                                            id='autocomplete-input'
                                            className='with-border'
                                            type='text'
                                            name='teamsubt'
                                            value={teamsubt}
                                            onChange={onChange}
                                            placeholder='e.g. The best team on your area'
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
                                        teamdetails={teamdetails}
                                        value={teamdetails}
                                        onChange={(e) => {
                                            setNewteam({
                                                ...newteam,
                                                teamdetails: e,
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
                                        title='Extra title for h3 tag'
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
                                    Box Title{' '}
                                    <i
                                        className='help-icon'
                                        data-tippy-placement='right'
                                        title='Extra Content Title'
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
                                Save Box <i className='icon-feather-plus'></i>
                            </button>
                        </div>

                        <div
                            className='content with-padding'
                            style={{ width: '100%' }}
                        >
                            {extraboxes &&
                                extraboxes.length > 0 &&
                                extraboxes
                                    .sort((a, b) => a.order - b.order)
                                    .map((box) => (
                                        <div className='row' key={box._id}>
                                            <div
                                                className='col-xl-10'
                                                style={{
                                                    marginTop: 50,
                                                    marginBottom: 20,
                                                }}
                                            >
                                                <h5>{box.subtitle}</h5>
                                                <div
                                                    className='mb-body'
                                                    dangerouslySetInnerHTML={{
                                                        __html: box.bodybox,
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
                                                        transferBox(box._id)
                                                    }
                                                >
                                                    <i className='icon-feather-edit'></i>
                                                </button>
                                                <button
                                                    className='button red ripple-effect ico'
                                                    title='Remove Extra Box'
                                                    data-tippy-placement='top'
                                                    onClick={(e) =>
                                                        onRemove(e, box._id)
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
                                <h5>Team Background</h5>
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
                                <i className='icon-feather-plus'></i> Edit Team
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
