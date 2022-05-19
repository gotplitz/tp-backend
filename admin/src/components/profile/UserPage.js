import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';

// Pages parts
import DashNav from '../layout/DashNav';
import Footer from '../layout/Footer';
import EditUser from './EditUser';

import Spinning from '../extras/Spinning';
import { Link } from 'react-router-dom';
import ChangePassword from './ChangePassword';

const UserPage = () => {
    const authContext = useContext(AuthContext);
    const { loadUser, user, loading } = authContext;
    const profileContext = useContext(ProfileContext);
    const { getCurrentProfile, profile } = profileContext;

    useEffect(() => {
        loadUser();
        getCurrentProfile();
        // eslint-disable-next-line
    }, []);

    return loading ? (
        <Spinning />
    ) : (
        <Fragment>
            <DashNav />
            {!profile ? (
                <div className='dashboard-content-container' data-simplebar>
                    <div className='dashboard-content-inner'>
                        <div className='dashboard-headline'>
                            <h3>Account Settings</h3>
                        </div>

                        <div className='row'>
                            <div className='col-xl-12'>
                                <div className='dashboard-box'>
                                    <div className='headline'>
                                        <h3>
                                            <i className='icon-material-outline-account-circle'></i>{' '}
                                            My Account
                                        </h3>

                                        <EditUser
                                            user={user}
                                            loading={loading}
                                            loadUser
                                        />
                                        <hr style={{ margin: '80px 0 20px' }} />
                                        <ChangePassword
                                            user={user}
                                            loading={loading}
                                            loadUser
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-12'>
                                <div className='dashboard-box'>
                                    <div className='headline'>
                                        <p>
                                            Don't forget to create yourprofile
                                        </p>
                                        <Link
                                            to='/my-profile'
                                            className='button ripple-effect big'
                                        >
                                            Edit Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            ) : (
                <div className='dashboard-content-container' data-simplebar>
                    <div className='dashboard-content-inner'>
                        <div className='dashboard-headline'>
                            <h3>Account Settings</h3>
                        </div>

                        <div className='row'>
                            <div className='col-xl-12'>
                                <div className='dashboard-box'>
                                    <div className='headline'>
                                        <h3>
                                            <i className='icon-material-outline-account-circle'></i>{' '}
                                            My Account
                                        </h3>

                                        <EditUser
                                            user={user}
                                            loading={loading}
                                            loadUser
                                        />
                                        <hr style={{ margin: '80px 0 20px' }} />
                                        <ChangePassword
                                            user={user}
                                            loading={loading}
                                            loadUser
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default UserPage;
