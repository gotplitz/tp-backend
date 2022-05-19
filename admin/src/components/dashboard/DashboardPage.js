import React, { Fragment, useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

// Page parts
import DashNav from '../layout/DashNav';
import Footer from '../layout/Footer';
import DashboardCounts from './DashboardCounts';
import ScrollToTop from '../extras/ScrollToTop';
import DashboardLists from './DashboardLists';

const DashboardPage = () => {
    const authContext = useContext(AuthContext);

    const { loadUser, user } = authContext;

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <ScrollToTop />
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Hi, {user && user.name}!</h3>
                        <span>Welcome to your dashboard!</span>
                    </div>
                    {user && user.userrole === 'appadmin' ? (
                        <Fragment>
                            <DashboardCounts />
                            <DashboardLists />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p>
                                Thanks for keep our website updated. If you have
                                any issue please contact your adminsitrator or
                                web master.
                            </p>
                        </Fragment>
                    )}
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardPage;
