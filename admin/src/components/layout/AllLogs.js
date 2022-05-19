import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import LogContext from '../../context/log/logContext';

// Page parts
import DashNav from '../layout/DashNav';
import Footer from '../layout/Footer';
import LogsList from '../logs/LogsList';

const AllLogs = () => {
    const authContext = useContext(AuthContext);
    const logContext = useContext(LogContext);

    const { loadUser } = authContext;
    const { getHistories, logs } = logContext;

    useEffect(() => {
        loadUser();
        getHistories();

        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>CMS Activity Log</h3>
                    </div>

                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='dashboard-box'>
                                <div className='headline'>
                                    <h3>
                                        <i className='icon-feather-archive'></i>{' '}
                                        All users activity
                                    </h3>
                                    <div className='content'>
                                        <ul className='dashboard-box-list'>
                                            <LogsList logs={logs} />
                                        </ul>
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

export default AllLogs;
