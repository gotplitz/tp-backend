import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Sliders from './Sliders';
import DashNav from '../layout/DashNav';
import SliderFilter from './SliderFilter';

const SlidersPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>My Sliders</h3>

                        <div className='container'>
                            <SliderFilter />
                        </div>
                    </div>
                    <Sliders />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default SlidersPage;
