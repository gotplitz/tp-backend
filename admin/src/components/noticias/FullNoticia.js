import React, { useContext, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';

// Contexts
import AuthContext from '../../context/auth/authContext';
import NoticiaContext from '../../context/noticia/noticiaContext';

// Page parts
import Spinning from '../extras/Spinning';
import Footer from '../layout/Footer';

const FullNoticia = ({ match, history }) => {
    const authContext = useContext(AuthContext);
    const noticiaContext = useContext(NoticiaContext);

    const { loadUser } = authContext;
    const { getNoticiaByLink, noticia, loading } = noticiaContext;

    useEffect(() => {
        getNoticiaByLink(match.params.newslink);
        loadUser();

        // eslint-disable-next-line
    }, []);

    const onClick = () => {
        return <Redirect to={`/${history.goBack()}`} />;
    };

    return loading && noticia === null ? (
        <Spinning />
    ) : (
        <Fragment>
            <div className='dashboard-content-container'>
                <div className='single-page-header worker-header'>
                    <div className='header-bg'></div>
                    <div
                        style={{
                            backgroundImage: `url('/uploads/${
                                noticia && noticia.featuredimg
                            }')`,
                            display: 'block',
                            backgroundSize: 'cover',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: 16,
                            top: 0,
                            bottom: 0,
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    <div className='container' style={{ padding: '0 50px' }}>
                        <div className='row'>
                            <div className='col-xl-12 col-lg-12'>
                                <div className='single-page-header-inner'>
                                    <div className='left-side'>
                                        <div className='header-image worker-avatar'>
                                            <img
                                                src={`/uploads/${
                                                    noticia && noticia.photo
                                                }`}
                                                alt=''
                                            />
                                        </div>
                                        <div className='header-details'>
                                            <h3>
                                                {noticia &&
                                                    noticia.noticiatitle}
                                                <span>
                                                    Published by:{' '}
                                                    {noticia && noticia.name}{' '}
                                                    {noticia &&
                                                        noticia.lastname}{' '}
                                                    | {noticia && noticia.title}
                                                </span>
                                            </h3>
                                            <ul
                                                style={{
                                                    display: 'flex',
                                                    alignContent: 'flex-start',
                                                }}
                                            >
                                                <li>
                                                    {noticia &&
                                                        noticia.newscat.map(
                                                            (
                                                                category,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    className='star-rating'
                                                                    data-rating={
                                                                        category
                                                                    }
                                                                ></div>
                                                            )
                                                        )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='right-side'>
                                        <div className='dashboard-headline'>
                                            <nav
                                                id='breadcrumbs'
                                                className='dark'
                                            >
                                                <ul>
                                                    <li>
                                                        <Link to='/dashboard'>
                                                            Dashboard
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/news'>
                                                            List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to='#!'
                                                            onClick={onClick}
                                                        >
                                                            Go Back
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container' style={{ padding: '0 50px' }}>
                    <div className='row'>
                        <div className='col-xl-9 col-lg-9'>
                            {/* Intro */}
                            <div className='single-page-section'>
                                <h5
                                    dangerouslySetInnerHTML={{
                                        __html: noticia && noticia.newsintro,
                                    }}
                                ></h5>
                            </div>

                            {/* Content */}
                            <div className='single-page-section'>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: noticia && noticia.newscontent,
                                    }}
                                ></div>
                            </div>

                            {/* Dates */}

                            <div className='boxed-list'>
                                <div className='boxed-list-headline'>
                                    <h3>
                                        <i className='icon-material-outline-date-range'></i>{' '}
                                        Posted on:{' '}
                                        <Moment format='MMMM DD, YYYY'>
                                            {noticia && noticia.date}
                                        </Moment>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Right side bar with details */}

                        <div className='col-xl-3 col-lg-3'>
                            <div className='sidebar-container'>
                                <div className='profile-overview'>
                                    <div className='overview-item'>
                                        <strong>
                                            {noticia && noticia.newsstatus
                                                ? 'Public'
                                                : 'Hidden'}
                                        </strong>
                                        <span>Front-end Visibility</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className='container'
                    style={{ padding: '0 50px', marginTop: 60 }}
                >
                    <Link
                        to='/news'
                        className='button'
                        style={{ marginLeft: 10 }}
                    >
                        Back to News List
                    </Link>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
};

export default FullNoticia;
