import React, { Fragment } from 'react';

//Page parts
import Footer from '../layout/Footer';
import Noticias from './Noticias';
import DashNav from '../layout/DashNav';
import NoticiaFilter from './NoticiaFilter';

const NoticiasPage = () => {
    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>All Posts</h3>

                        <div className='container'>
                            <NoticiaFilter />
                        </div>
                    </div>
                    <Noticias />
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default NoticiasPage;
