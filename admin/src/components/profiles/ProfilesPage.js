import React, { Fragment, useContext, useEffect } from 'react';
import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext';

// Pages parts
import DashNav from '../layout/DashNav';
import Footer from '../layout/Footer';
import Spinning from '../extras/Spinning';
import ProfilesItem from './ProfilesItem';

const ProfilesPage = () => {
    const profileContext = useContext(ProfileContext);
    const {
        getCurrentProfile,
        getProfiles,
        profiles,
        loading,
    } = profileContext;
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        getCurrentProfile();
        getProfiles();
        loadUser();
        // eslint-disable-next-line
    }, []);
    return loading && profiles === [] ? (
        <Spinning />
    ) : (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Administrators and Editors</h3>
                    </div>

                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='dashboard-box'>
                                <div className='headline'>
                                    <h3>
                                        <i className='icon-line-awesome-group'></i>{' '}
                                        Current Users
                                    </h3>

                                    <div
                                        className='workers-container workers-list-layout'
                                        style={{ marginTop: 40 }}
                                    >
                                        {profiles && profiles.length > 0 ? (
                                            profiles.map((profile) => (
                                                <ProfilesItem
                                                    key={profile._id}
                                                    profile={profile}
                                                />
                                            ))
                                        ) : (
                                            <h3>There is no profiles</h3>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default ProfilesPage;
