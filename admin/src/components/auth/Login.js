import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import LogContext from '../../context/log/logContext';

import Footer from '../layout/Footer';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const logContext = useContext(LogContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;
    const { setLog } = logContext;

    useEffect(() => {
        if (isAuthenticated) {
            setLog({ msg: 'User logged in', type: 'success' });
            props.history.push('/dashboard');
        }
        if (error === 'Invalid Credentials') {
            setLog({ msg: 'A user faild to login', type: 'error' });
            setAlert(error, 'error');
            clearErrors();
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
    }, [error, isAuthenticated, props.history]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert(`Enter eMail and Password`, 'error');
        } else {
            login({
                email,
                password,
            });
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
                                <h2>Log In</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-6 offset-xl-3'>
                            <div className='login-register-page'>
                                <div className='welcome-text'>
                                    <h3>We're glad to see you again!</h3>
                                    <span>
                                        Don't have an account?{' '}
                                        <Link to='/register'>Sign Up!</Link>
                                    </span>
                                </div>
                                <form
                                    id='login-form'
                                    onSubmit={(e) => onSubmit(e)}
                                >
                                    <div className='input-with-icon-left'>
                                        <i className='icon-material-baseline-mail-outline'></i>
                                        <input
                                            type='text'
                                            className='input-text with-border'
                                            name='email'
                                            value={email}
                                            placeholder='Email Address'
                                            onChange={(e) => onChange(e)}
                                        />
                                    </div>

                                    <div className='input-with-icon-left'>
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

                                    <button
                                        className='button full-width button-sliding-icon ripple-effect'
                                        type='submit'
                                    >
                                        Log In{' '}
                                        <i className='icon-material-outline-arrow-right-alt'></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </Fragment>
    );
};

export default Login;
