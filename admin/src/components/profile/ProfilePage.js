import React, { Fragment, useContext, useEffect } from 'react';
import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext';

// Pages parts
import DashNav from '../layout/DashNav';
import Footer from '../layout/Footer';
import EditProfile from './EditProfile';
import NewProfile from './NewProfile';

const ProfilePage = () => {
  const profileContext = useContext(ProfileContext);
  const { getCurrentProfile, profile } = profileContext;
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    getCurrentProfile();

    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <DashNav />
      <div className='dashboard-content-container' data-simplebar>
        <div className='dashboard-content-inner'>
          <div className='dashboard-headline'>
            <h3>Update Your Profile</h3>
          </div>

          <div className='row'>
            <div className='col-xl-12'>
              <div className='dashboard-box'>
                <div className='headline'>
                  <h3>
                    <i className='icon-material-outline-face'></i> My Profile
                  </h3>

                  {profile === null ? <NewProfile /> : <EditProfile />}
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

export default ProfilePage;
