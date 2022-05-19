import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Locations from './Locations';
import DashNav from '../layout/DashNav';
import LocationFilter from './LocationFilter';

const LocationsPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Locations</h3>

                        <div className='container'>
                            <LocationFilter />
                        </div>
                    </div>
                    <Locations />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default LocationsPage;
