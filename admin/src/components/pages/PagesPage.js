import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Pages from './Pages';
import DashNav from '../layout/DashNav';
import PageFilter from './PageFilter';

const PagesPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>Page</h3>

                        <div className='container'>
                            <PageFilter />
                        </div>
                    </div>
                    <Pages />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default PagesPage;
