import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import LogContext from '../../context/log/logContext';

// Components
import '../extras/extras.css';
import Message from '../layout/Message';
import Progress from '../layout/Progress';
import Footer from '../layout/Footer';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const logContext = useContext(LogContext);

    const { setAlert } = alertContext;
    const { setLog } = logContext;
    const {
        register,
        error,
        clearErrors,
        isAuthenticated,
        loadUser,
    } = authContext;

    useEffect(() => {
        loadUser();
        if (error === 'User already exists') {
            setAlert(error, 'error');
            clearErrors();
        }

        if (isAuthenticated) {
            setLog({ msg: 'User logged in', type: 'success' });
            props.history.push('/dashboard');
        }

        const script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = '/js/custom.js';
        script.async = true;

        document.body.insertBefore(script, document.body.children[4]);

        return () => {
            document.body.removeChild(script);
        };

        // eslint-disable-next-line
    }, [error, props.history]);

    const [file, setFile] = useState('');
    const [newimg, setNewimg] = useState('Your file');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPer, setUploadPer] = useState(0);
    const [formData, setFormData] = useState({
        verified: false,
        userrole: 'editor',
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        password2: '',
        photo: 'placeholder.png',
    });

    const {
        userrole,
        name,
        lastname,
        phone,
        email,
        password,
        password2,
        photo,
    } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
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
        const fd = new FormData();
        fd.append('newimg', file);

        try {
            await axios
                .post('api/uploads', fd, {
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
        if (
            name === '' ||
            lastname === '' ||
            email === '' ||
            password === '' ||
            password2 === ''
        ) {
            setAlert(`You are missing fields`, 'error');
        } else if (password !== password2) {
            setAlert(`Passwords Don't Match`, 'error');
        } else {
            setLog({
                msg: `The user ${email} has been created`,
                type: 'success',
            });
            register({
                userrole,
                name,
                lastname,
                phone,
                email,
                password,
                photo,
            });
            props.history.push('/after-registration');
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }
    return (
        <Fragment>
            <div style={{ width: '100%' }}>
                <div id='titlebar' className='gradient'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h1>Register</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container registration-form'>
                    <div className='login-register-page'>
                        <div className='welcome-text'>
                            <h3 style={{ fontSize: 26 }}>
                                Let's create a user account!
                            </h3>
                            <span>
                                Already have an account?{' '}
                                <Link to='/login'>Log In!</Link>
                            </span>
                        </div>
                        <form
                            id='register-account-form'
                            onSubmit={(e) => onSubmit(e)}
                        >
                            <div className='account-type'>
                                <div>
                                    <input
                                        type='radio'
                                        name='userrole'
                                        id='freelancer-radio'
                                        className='account-type-radio'
                                        value='appadmin'
                                        onChange={(e) => onChange(e)}
                                    />
                                    <label
                                        htmlFor='freelancer-radio'
                                        className='ripple-effect-dark'
                                    >
                                        <i className='icon-material-outline-business-center'></i>{' '}
                                        Administrator
                                    </label>
                                </div>

                                <div>
                                    <input
                                        type='radio'
                                        name='userrole'
                                        id='employer-radio'
                                        className='account-type-radio'
                                        value='editor'
                                        onChange={(e) => onChange(e)}
                                    />
                                    <label
                                        htmlFor='employer-radio'
                                        className='ripple-effect-dark'
                                    >
                                        <i className='icon-material-outline-account-circle'></i>{' '}
                                        Editor
                                    </label>
                                </div>
                            </div>

                            <div className='input-with-icon-left'>
                                <i className='icon-feather-user-check'></i>
                                <input
                                    type='text'
                                    className='input-text with-border'
                                    name='name'
                                    value={name}
                                    placeholder='Name'
                                    autoComplete='off'
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='input-with-icon-left'>
                                <i className='icon-feather-user-check'></i>
                                <input
                                    type='text'
                                    className='input-text with-border'
                                    name='lastname'
                                    value={lastname}
                                    autoComplete='off'
                                    placeholder='Last Name'
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='input-with-icon-left'>
                                <i className='icon-material-baseline-mail-outline'></i>
                                <input
                                    type='email'
                                    className='input-text with-border'
                                    name='email'
                                    value={email}
                                    placeholder='Email Address'
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='input-with-icon-left'>
                                <i className='icon-line-awesome-mobile-phone'></i>
                                <input
                                    type='text'
                                    className='input-text with-border'
                                    name='phone'
                                    value={phone}
                                    placeholder='Phone Number'
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div
                                className='input-with-icon-left'
                                title='Should be at least 8 characters long'
                                data-tippy-placement='bottom'
                            >
                                <i className='icon-material-outline-lock'></i>
                                <input
                                    type='password'
                                    className='input-text with-border'
                                    name='password'
                                    value={password}
                                    placeholder='Password'
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div className='input-with-icon-left'>
                                <i className='icon-material-outline-lock'></i>
                                <input
                                    type='password'
                                    className='input-text with-border'
                                    name='password2'
                                    value={password2}
                                    placeholder='Repeat Password'
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div className='input-with-icon-left'>
                                <i className='icon-material-outline-add-a-photo'></i>
                                <input
                                    id='myph'
                                    type='text'
                                    className='input-text with-border'
                                    name='photo'
                                    value={newimg}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div className='grid'>
                                <div className='column-4'>
                                    <input
                                        type='file'
                                        id='fileId'
                                        name='file'
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        onChange={inChange}
                                    />
                                    <label
                                        className='upload-button'
                                        htmlFor='fileId'
                                        id='filelabel'
                                        value={uploadedFile.filePath}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <i className='fas fa-upload'></i>{' '}
                                        <span>Browse</span>
                                    </label>
                                </div>
                                <div className='column-12'>
                                    {message ? <Message msg={message} /> : null}
                                    <button
                                        onClick={onPress}
                                        className='button dark ripple-effect'
                                    >
                                        Upload Image
                                    </button>

                                    {uploadedFile ? (
                                        <div className='grid placeholder'>
                                            <div className='column-12'>
                                                <div className='uploaded-image'>
                                                    <img
                                                        src={
                                                            uploadedFile.filePath
                                                        }
                                                        alt={
                                                            uploadedFile.newimg
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                                <div className='column-12'>
                                    <Progress percentage={uploadPer} />
                                </div>
                            </div>
                            <button
                                className='button full-width button-sliding-icon ripple-effect'
                                type='submit'
                            >
                                Submit{' '}
                                <i className='icon-material-outline-arrow-right-alt'></i>
                            </button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
};

export default Register;
