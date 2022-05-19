import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Testimonials from './Testimonials';
import DashNav from '../layout/DashNav';
import TestimonialFilter from './TestimonialFilter';

const TestimonialsPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Testimonials</h3>

                        <div className='container'>
                            <TestimonialFilter />
                        </div>
                    </div>
                    <Testimonials />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default TestimonialsPage;
