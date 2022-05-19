import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Services from './Services';
import DashNav from '../layout/DashNav';
import ServiceFilter from './ServiceFilter';

const ServicesPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Service</h3>

                        <div className='container'>
                            <ServiceFilter />
                        </div>
                    </div>
                    <Services />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default ServicesPage;
