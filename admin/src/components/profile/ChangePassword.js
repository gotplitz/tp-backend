import React, { Fragment, useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

// Needed Context
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

const ChangePassword = ({ user, loading }) => {
    // Context calls
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { loadUser, updatePass } = authContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    // States
    const [passData, setPassData] = useState({
        password: '',
        password2: '',
    });

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line
    }, [loading]);

    const { password, password2 } = passData;

    const onChange = (e) =>
        setPassData({ ...passData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password === '') {
            setAlert(`Password can't be empty`, 'error');
        } else if (password !== password2) {
            setAlert(`Passwords Don't Match`, 'error');
        } else {
            setAlert('User information updated', 'success');
            setLog({ msg: 'User information updated', type: 'success' });
            updatePass(passData);
            setPassData({ password: '', password2: '' });
        }
    };

    return (
        <Fragment>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='content with-padding'>
                    <div className='row'>
                        <div className='col'>
                            <div className='row'>
                                <div className='col-xl-12'>
                                    <div className='submit-field'>
                                        <h5>Change Password</h5>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div
                                    className='col-xl-6 input-with-icon-left'
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
                                        autoComplete='off'
                                    />
                                </div>

                                <div className='col-xl-6 input-with-icon-left'>
                                    <i className='icon-material-outline-lock'></i>
                                    <input
                                        type='password'
                                        className='input-text with-border'
                                        name='password2'
                                        value={password2}
                                        placeholder='Repeat Password'
                                        onChange={(e) => onChange(e)}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-12'>
                    <button type='submit' className='button ripple-effect big'>
                        Save New Password
                    </button>
                </div>
            </form>
        </Fragment>
    );
};

export default withRouter(ChangePassword);
