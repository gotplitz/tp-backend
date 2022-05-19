import React, { Fragment } from 'react';

// Page parts
import DashNav from '../layout/DashNav';
import Footer from '../layout/Footer';
import TeamForm from './TeamForm';

const TeamPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Teams Form</h3>
                    </div>
                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='dashboard-box margin-top-0'>
                                <div className='headline'>
                                    <h3>
                                        <i className='icon-feather-folder-plus'></i>{' '}
                                        Add a new team member
                                    </h3>
                                </div>

                                <TeamForm />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default TeamPage;
