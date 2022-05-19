import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Emails from './Emails';
import DashNav from '../layout/DashNav';
import EmailFilter from './EmailFilter';

const EmailsPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Contact Form Submissions</h3>

                        <div className='container'>
                            <EmailFilter />
                        </div>
                    </div>
                    <Emails />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default EmailsPage;
