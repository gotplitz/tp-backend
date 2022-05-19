import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Teams from './Teams';
import DashNav from '../layout/DashNav';
import TeamFilter from './TeamFilter';

const TeamsPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Team Members</h3>

                        <div className='container'>
                            <TeamFilter />
                        </div>
                    </div>
                    <Teams />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default TeamsPage;
