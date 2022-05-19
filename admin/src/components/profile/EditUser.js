import React, { Fragment, useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Progress from '../layout/Progress';

// Needed Context
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';
import ProfileContext from '../../context/profile/profileContext';

const EditUser = ({ user, loading }) => {
    // Context calls
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);
    const profileContext = useContext(ProfileContext);

    const { loadUser, updateUser, logout } = authContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;
    const { deleteAccount, getCurrentProfile } = profileContext;

    // States
    const [uploadedFile, setUploadedFile] = useState({});
    const [file, setFile] = useState('');
    const [newimg, setNewimg] = useState('Upload Image');
    const [uploadPer, setUploadPer] = useState(0);
    const [formData, setFormData] = useState({
        userrole: '',
        name: '',
        lastname: '',
        email: '',
        phone: '',
        photo: '',
    });

    useEffect(() => {
        loadUser();
        getCurrentProfile();

        setFormData({
            userrole: loading || !user.userrole ? '' : user.userrole,
            name: loading || !user.name ? '' : user.name,
            lastname: loading || !user.lastname ? '' : user.lastname,
            email: loading || !user.email ? '' : user.email,
            phone: loading || !user.phone ? '' : user.phone,
            photo: loading || !user.photo ? '' : user.photo,
        });

        setNewimg(`/uploads/${user && user.photo}`);

        // eslint-disable-next-line
    }, [loading]);

    const { userrole, name, lastname, email, phone } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const inChange = (e) => {
        setFile(e.target.files[0]);
        setNewimg(URL.createObjectURL(e.target.files[0]));
        setFormData({
            ...formData,
            photo: e.target.files[0].name
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
                    setFormData({
                        ...formData,
                        photo: res.data.filePath.replace('uploads/', ''),
                    });
                    const { newimg, filePath } = res.data;

                    setUploadedFile({ newimg, filePath });

                    setAlert('File Uploaded', 'success');
                })
                .catch((error) => {
                    setAlert('Error after uploading file', 'error');
                });
        } catch (err) {
            if (err.response.status === 500) {
                setAlert('There was a problem with the server', 'error');
            } else {
                setAlert(err.response.data.msg, err.response.data.type);
            }
        }
    };

    const onClick = () => {
        deleteAccount();
        logout();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setAlert('User information updated', 'success');
        setLog({ msg: 'User information updated', type: 'success' });
        updateUser(formData);
    };

    return (
        <Fragment>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='content with-padding'>
                    <div className='row'>
                        <div className='col-auto'>
                            <div
                                className='avatar-wrapper'
                                data-tippy-placement='top'
                                title='Click to browse for a new picture'
                            >
                                <label
                                    className='upload-button'
                                    htmlFor='fileId'
                                    id='filelabel'
                                    value={uploadedFile.filePath}
                                    style={{
                                        cursor: 'pointer',

                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <i className='fas fa-upload'></i>{' '}
                                    <span style={{ marginLeft: 5 }}>
                                        Browse
                                    </span>
                                </label>
                                <img
                                    className='profile-pic'
                                    src={`${newimg}`}
                                    alt={name}
                                />

                                <input
                                    type='file'
                                    id='fileId'
                                    name='file'
                                    style={{ display: 'none' }}
                                    onChange={inChange}
                                />
                            </div>

                            <div>
                                <button
                                    onClick={onPress}
                                    className='button dark ripple-effect'
                                >
                                    Upload Image
                                </button>
                            </div>
                            <div>
                                <Progress percentage={uploadPer} />
                                {uploadedFile ? (
                                    <div className='grid placeholder'>
                                        <div className='column-12'>
                                            <div className='avatar-wrapper'>
                                                <img
                                                    className='profile-pic'
                                                    src={uploadedFile.filePath}
                                                    alt={uploadedFile.newimg}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className='col'>
                            <div className='row'>
                                <div className='col-xl-12'>
                                    <div className='submit-field'>
                                        <h5>Account Type</h5>
                                        <div className='account-type'>
                                            {userrole === 'appadmin' ? (
                                                <div>
                                                    <input
                                                        type='radio'
                                                        name='userrole'
                                                        id='freelancer-radio'
                                                        className='account-type-radio'
                                                        value={userrole}
                                                        onChange={(e) =>
                                                            onChange(e)
                                                        }
                                                        checked
                                                    />
                                                    <label
                                                        htmlFor='freelancer-radio'
                                                        className='ripple-effect-dark'
                                                    >
                                                        <i className='icon-material-outline-business-center'></i>{' '}
                                                        Administrator
                                                    </label>
                                                </div>
                                            ) : (
                                                <div>
                                                    <input
                                                        type='radio'
                                                        name='userrole'
                                                        id='employer-radio'
                                                        className='account-type-radio'
                                                        value={userrole}
                                                        onChange={(e) =>
                                                            onChange(e)
                                                        }
                                                        checked
                                                    />
                                                    <label
                                                        htmlFor='employer-radio'
                                                        className='ripple-effect-dark'
                                                    >
                                                        <i className='icon-material-outline-account-circle'></i>{' '}
                                                        Employee
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='col-xl-6'>
                                    <div className='submit-field'>
                                        <h5>First Name</h5>
                                        <input
                                            name='name'
                                            type='text'
                                            className='with-border'
                                            value={name}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>
                                </div>

                                <div className='col-xl-6'>
                                    <div className='submit-field'>
                                        <h5>Last Name</h5>
                                        <input
                                            name='lastname'
                                            type='text'
                                            className='with-border'
                                            value={lastname}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>
                                </div>

                                <div className='col-xl-6'>
                                    <div className='submit-field'>
                                        <h5>Email</h5>
                                        <input
                                            name='email'
                                            type='text'
                                            className='with-border'
                                            value={email}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className='col-xl-6'>
                                    <div className='submit-field'>
                                        <h5>Phone</h5>
                                        <input
                                            name='phone'
                                            type='text'
                                            className='with-border'
                                            value={phone}
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-12'>
                    <button type='submit' className='button ripple-effect big'>
                        Save Changes
                    </button>

                    <button
                        type='submit'
                        className='button ripple-effect big gray'
                        onClick={onClick}
                        style={{ right: 30, position: 'absolute' }}
                    >
                        <i className='icon-feather-user-x'></i>{' '}
                        <span style={{ marginLeft: 10 }}>Delete Account</span>
                    </button>
                </div>
            </form>
        </Fragment>
    );
};

export default withRouter(EditUser);
