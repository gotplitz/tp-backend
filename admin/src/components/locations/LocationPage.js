import React, { Fragment } from 'react';

// Page parts
import DashNav from '../layout/DashNav';
import Footer from '../layout/Footer';
import LocationForm from './LocationForm';

const LocationPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Locations Form</h3>
                    </div>
                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='dashboard-box margin-top-0'>
                                <div className='headline'>
                                    <h3>
                                        <i className='icon-feather-folder-plus'></i>{' '}
                                        Add a new Location
                                    </h3>
                                </div>

                                <LocationForm />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default LocationPage;
