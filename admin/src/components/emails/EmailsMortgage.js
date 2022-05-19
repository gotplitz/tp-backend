import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Mortgages from './Mortgages';
import DashNav from '../layout/DashNav';
import EmailFilter from './EmailFilter';

const EmailsPageDev = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Mortgage Calculator Results Requests</h3>

                        <div className='container'>
                            <EmailFilter />
                        </div>
                    </div>
                    <Mortgages />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default EmailsPageDev;
