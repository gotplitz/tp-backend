import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Promos from './Promos';
import DashNav from '../layout/DashNav';
import PromoFilter from './PromoFilter';

const PromosPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>My Promos</h3>

                        <div className='container'>
                            <PromoFilter />
                        </div>
                    </div>
                    <Promos />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default PromosPage;
