import React, { useContext, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';

// Contexts
import AuthContext from '../../context/auth/authContext';
import ServiceContext from '../../context/service/serviceContext';

// Page parts
import Spinning from '../extras/Spinning';
import Footer from '../layout/Footer';

const FullService = ({ match, history }) => {
    const authContext = useContext(AuthContext);
    const serviceContext = useContext(ServiceContext);

    const { loadUser } = authContext;
    const { getServiceByLink, service, loading } = serviceContext;

    useEffect(() => {
        getServiceByLink(match.params.servicelink);
        loadUser();

        // eslint-disable-next-line
    }, []);

    const onClick = () => {
        return <Redirect to={`/${history.goBack()}`} />;
    };

    return loading && service === null ? (
        <Spinning />
    ) : (
        <Fragment>
            <div className='dashboard-content-container'>
                <div className='single-page-header worker-header'>
                    <div className='header-bg'></div>
                    <div
                        style={{
                            backgroundImage: `url('/uploads/${
                                service && service.featuredimg
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
                                                    service && service.photo
                                                }`}
                                                alt=''
                                            />
                                        </div>
                                        <div className='header-details'>
                                            <h3>
                                                {service &&
                                                    service.servicetitle}
                                                <span>
                                                    Published by:{' '}
                                                    {service && service.name}{' '}
                                                    {service &&
                                                        service.lastname}{' '}
                                                </span>
                                            </h3>
                                            <ul
                                                style={{
                                                    display: 'flex',
                                                    alignContent: 'flex-start',
                                                }}
                                            >
                                                {/* <li>
                                                    {service &&
                                                        service.servicecat.map(
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
                                                        <Link to='/services'>
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
                            {/* Body of the service */}

                            <div className='single-page-section'>
                                <h2
                                    dangerouslySetInnerHTML={{
                                        __html: service && service.servicesubt,
                                    }}
                                ></h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            service && service.servicedetails,
                                    }}
                                ></div>
                            </div>

                            {/* Boxes */}

                            <div className='boxed-list'>
                                {service &&
                                    service.extraboxes.length > 0 &&
                                    service.extraboxes.map((eb, index) => (
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
                                        <strong>
                                            {service && service.servicesubt}
                                        </strong>
                                        <span>Subtitle</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            {service &&
                                            service.extraboxes.length > 0
                                                ? service.extraboxes.length
                                                : 'No Metaboxes'}
                                        </strong>
                                        <span>Metaboxes</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            {service && service.servicestatus
                                                ? 'Public'
                                                : 'Hidden'}
                                        </strong>
                                        <span>Front-end Visibility</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            <Moment format='MMMM DD, YYYY'>
                                                {service && service.date}
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
                        to='/services'
                        className='button'
                        style={{ marginLeft: 10 }}
                    >
                        Back to Services List
                    </Link>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
};

export default FullService;
