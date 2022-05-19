import React, { useContext, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';

// Contexts
import AuthContext from '../../context/auth/authContext';
import PageContext from '../../context/page/pageContext';

// Page parts
import Spinning from '../extras/Spinning';
import Footer from '../layout/Footer';

const FullPage = ({ match, history }) => {
    const authContext = useContext(AuthContext);
    const pageContext = useContext(PageContext);

    const { loadUser } = authContext;
    const { getPageByLink, page, loading } = pageContext;

    useEffect(() => {
        getPageByLink(match.params.pagelink);
        loadUser();

        // eslint-disable-next-line
    }, []);

    const onClick = () => {
        return <Redirect to={`/${history.goBack()}`} />;
    };

    return loading && page === null ? (
        <Spinning />
    ) : (
        <Fragment>
            <div className='dashboard-content-container'>
                <div className='single-page-header worker-header'>
                    <div className='header-bg'></div>
                    <div
                        style={{
                            backgroundImage: `url('/uploads/${
                                page && page.featuredimg
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
                                                    page && page.photo
                                                }`}
                                                alt=''
                                            />
                                        </div>
                                        <div className='header-details'>
                                            <h3>
                                                {page && page.pagetitle}
                                                <span>
                                                    Published by:{' '}
                                                    {page && page.name}{' '}
                                                    {page && page.lastname}{' '}
                                                </span>
                                            </h3>
                                            <ul
                                                style={{
                                                    display: 'flex',
                                                    alignContent: 'flex-start',
                                                }}
                                            >
                                                {/* <li>
                                                    {page &&
                                                        page.pagecat.map(
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
                                                </li> */}
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
                                                        <Link to='/pages'>
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
                            {/* Body of the page */}

                            <div className='single-page-section'>
                                <h2
                                    dangerouslySetInnerHTML={{
                                        __html: page && page.pagesubt,
                                    }}
                                ></h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: page && page.pagedetails,
                                    }}
                                ></div>
                            </div>

                            {/* Boxes */}

                            <div className='boxed-list'>
                                {page &&
                                    page.extraboxes.length > 0 &&
                                    page.extraboxes.map((eb, index) => (
                                        <div
                                            key={index}
                                            className='boxed-list-headline'
                                        >
                                            <div className='row'>
                                                <div className='col-xl-6 col-sm-12'>
                                                    <img
                                                        src={`/uploads/${eb.img}`}
                                                        alt={eb.subtitle}
                                                    />
                                                </div>
                                                <div className='col-xl-6 col-sm-12'>
                                                    <h3
                                                        dangerouslySetInnerHTML={{
                                                            __html: eb.subtitle,
                                                        }}
                                                    ></h3>
                                                    <div
                                                        style={{
                                                            whiteSpace:
                                                                'pre-wrap',
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: eb.bodybox,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Right side bar with details */}

                        <div className='col-xl-3 col-lg-3'>
                            <div className='sidebar-container'>
                                <div className='profile-overview'>
                                    <div className='overview-item'>
                                        <strong>{page && page.pagesubt}</strong>
                                        <span>Subtitle</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            {page && page.extraboxes.length > 0
                                                ? page.extraboxes.length
                                                : 'No Metaboxes'}
                                        </strong>
                                        <span>Metaboxes</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            {page && page.pagestatus
                                                ? 'Public'
                                                : 'Hidden'}
                                        </strong>
                                        <span>Front-end Visibility</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            <Moment format='MMMM DD, YYYY'>
                                                {page && page.date}
                                            </Moment>
                                        </strong>
                                        <span>Posted on</span>
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
                        to='/pages'
                        className='button'
                        style={{ marginLeft: 10 }}
                    >
                        Back to Pages List
                    </Link>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
};

export default FullPage;
