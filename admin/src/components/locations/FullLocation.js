import React, { useContext, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';

// Contexts
import AuthContext from '../../context/auth/authContext';
import LocationContext from '../../context/location/locationContext';

// Page parts
import Spinning from '../extras/Spinning';
import Footer from '../layout/Footer';

const FullLocation = ({ match, history }) => {
    const authContext = useContext(AuthContext);
    const locationContext = useContext(LocationContext);

    const { loadUser } = authContext;
    const { getLocationByLink, location, loading } = locationContext;

    useEffect(() => {
        getLocationByLink(match.params.locationlink);
        loadUser();

        // eslint-disable-next-line
    }, []);

    const onClick = () => {
        return <Redirect to={`/${history.goBack()}`} />;
    };

    return loading && location === null ? (
        <Spinning />
    ) : (
        <Fragment>
            <div className='dashboard-content-container'>
                <div className='single-page-header worker-header'>
                    <div className='header-bg'></div>
                    <div
                        style={{
                            backgroundImage: `url('/uploads/${
                                location && location.featuredimg
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
                                                    location && location.photo
                                                }`}
                                                alt=''
                                            />
                                        </div>
                                        <div className='header-details'>
                                            <h3>
                                                {location &&
                                                    location.locationtitle}
                                                <span>
                                                    Published by:{' '}
                                                    {location && location.name}{' '}
                                                    {location &&
                                                        location.lastname}{' '}
                                                </span>
                                            </h3>
                                            <ul
                                                style={{
                                                    display: 'flex',
                                                    alignContent: 'flex-start',
                                                }}
                                            >
                                                {/* <li>
                                                    {location &&
                                                        location.locationcat.map(
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
                                                        <Link to='/locations'>
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
                            {/* Body of the location */}
                            <div className='single-page-section'>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            location &&
                                            location.locationdetails,
                                    }}
                                ></div>
                            </div>

                            {/* Dates */}

                            <div className='boxed-list'>
                                {location &&
                                    location.extraboxes.length > 0 &&
                                    location.extraboxes.map((eb, index) => (
                                        <div
                                            key={index}
                                            className='boxed-list-headline'
                                        >
                                            <h3
                                                dangerouslySetInnerHTML={{
                                                    __html: eb.subtitle,
                                                }}
                                            ></h3>
                                            <div
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: eb.bodybox,
                                                }}
                                            ></div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Right side bar with details */}

                        <div className='col-xl-3 col-lg-3'>
                            <div className='sidebar-container'>
                                <div className='profile-overview'>
                                    <div className='overview-item'>
                                        <strong>
                                            {location && location.locationsubt}
                                        </strong>
                                        <span>Subtitle</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            {location &&
                                            location.extraboxes.length > 0
                                                ? location.extraboxes.length
                                                : 'No Metaboxes'}
                                        </strong>
                                        <span>Metaboxes</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            {location && location.locationstatus
                                                ? 'Public'
                                                : 'Hidden'}
                                        </strong>
                                        <span>Front-end Visibility</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            <Moment format='MMMM DD, YYYY'>
                                                {location && location.date}
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
                        to='/locations'
                        className='button'
                        style={{ marginLeft: 10 }}
                    >
                        Back to Location Posts List
                    </Link>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
};

export default FullLocation;
