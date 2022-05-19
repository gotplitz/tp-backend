import React, { Fragment, useContext, useEffect } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';

function ProfileItem({ profile, history, user }) {
    const authContext = useContext(AuthContext);
    const profileContext = useContext(ProfileContext);

    const { loadUser, isAuthenticated } = authContext;
    const { getProfiles } = profileContext;

    useEffect(() => {
        loadUser();
        getProfiles();

        // eslint-disable-next-line
    }, []);

    const onClick = () => {
        return <Redirect to={`/${history.goBack()}`} />;
    };

    return (
        <Fragment>
            <div className='single-page-header worker-header'>
                <div className='container' style={{ padding: '0 50px' }}>
                    <div className='row'>
                        <div className='col-xl-12 col-lg-12'>
                            <div className='single-page-header-inner'>
                                <div className='left-side'>
                                    <div className='header-image worker-avatar'>
                                        <img
                                            src={`/uploads/${
                                                profile && profile.user.photo
                                            }`}
                                            alt=''
                                        />
                                    </div>
                                    <div className='header-details'>
                                        <h3>
                                            {profile && profile.user.name}{' '}
                                            {profile && profile.user.lastname}{' '}
                                            <span>
                                                {profile && profile.title}
                                            </span>
                                        </h3>
                                        <ul
                                            style={{
                                                display: 'flex',
                                                alignContent: 'flex-start',
                                            }}
                                        >
                                            <li>
                                                {profile &&
                                                    profile.departments.map(
                                                        (
                                                            departments,
                                                            index
                                                        ) => (
                                                            <div
                                                                key={index}
                                                                className='star-rating'
                                                                data-rating={
                                                                    departments
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
                                        <nav id='breadcrumbs' className='dark'>
                                            <ul>
                                                <li>
                                                    <Link to='/dashboard'>
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to='/all-profiles'>
                                                        List
                                                    </Link>
                                                </li>
                                                {isAuthenticated &&
                                                    user &&
                                                    user._id ===
                                                        profile.user._id && (
                                                        <li>
                                                            <Link to='/my-profile'>
                                                                Edit
                                                            </Link>
                                                        </li>
                                                    )}
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
                    <div className='col-xl-7 col-lg-7'>
                        {/* Biography portion */}
                        <div className='single-page-section'>
                            <h3>Bio</h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: profile && profile.bio,
                                }}
                            ></div>
                        </div>

                        {/* Profile properties list */}

                        <div
                            className='boxed-list'
                            style={{ marginButton: 60 }}
                        >
                            <div className='boxed-list-headline'>
                                <h3>
                                    <i className='icon-material-outline-business'></i>{' '}
                                    Personal Pages
                                </h3>
                            </div>
                            <ul className='boxed-list-ul'>
                                <li>
                                    <div className='boxed-list-item'>
                                        <div className='item-content'>
                                            <h4>Development Team Leader</h4>
                                            <div className='item-details margin-top-7'>
                                                <div className='detail-item'>
                                                    <a href='#!'>
                                                        <i className='icon-material-outline-business'></i>{' '}
                                                        Acodia
                                                    </a>
                                                </div>
                                                <div className='detail-item'>
                                                    <i className='icon-material-outline-date-range'></i>{' '}
                                                    May 2019 - Present
                                                </div>
                                            </div>
                                            <div className='item-description'>
                                                <p>
                                                    Focus the team on the tasks
                                                    at hand or the internal and
                                                    external customer
                                                    requirements.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='boxed-list-item'>
                                        <div className='item-content'>
                                            <h4>
                                                <a href='#!'>
                                                    Lead UX/UI Designer
                                                </a>
                                            </h4>
                                            <div className='item-details margin-top-7'>
                                                <div className='detail-item'>
                                                    <a href='#!'>
                                                        <i className='icon-material-outline-business'></i>{' '}
                                                        Acorta
                                                    </a>
                                                </div>
                                                <div className='detail-item'>
                                                    <i className='icon-material-outline-date-range'></i>{' '}
                                                    April 2014 - May 2019
                                                </div>
                                            </div>
                                            <div className='item-description'>
                                                <p>
                                                    I designed and implemented
                                                    10+ custom web-based CRMs,
                                                    workflow systems, payment
                                                    solutions and mobile apps.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right side bar with details */}

                    <div className='col-xl-5 col-lg-5'>
                        <div className='sidebar-container'>
                            <div className='profile-overview'>
                                <div className='overview-item'>
                                    <strong>
                                        <a
                                            href={`tel:${
                                                profile && profile.user.phone
                                            }`}
                                        >
                                            {profile && profile.user.phone}
                                        </a>
                                    </strong>
                                    <span>Phone Number</span>
                                </div>
                                <div className='overview-item'>
                                    <strong>
                                        <a
                                            href={`mailto:${
                                                profile && profile.user.email
                                            }`}
                                        >
                                            {profile && profile.user.email}
                                        </a>
                                    </strong>
                                    <span>Email</span>
                                </div>
                            </div>

                            <div className='sidebar-widget'>
                                <h3>Social Profiles</h3>
                                <div className='worker-socials'>
                                    {profile && profile.social ? (
                                        <ul>
                                            {profile &&
                                            profile.social.linkedin ? (
                                                <li>
                                                    <a
                                                        href={`${
                                                            profile &&
                                                            profile.social
                                                                .linkedin
                                                        }`}
                                                        title='LinkedIn'
                                                        data-tippy-placement='top'
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        <i className='icon-feather-linkedin'></i>
                                                    </a>
                                                </li>
                                            ) : null}
                                            {profile &&
                                            profile.social.twitter ? (
                                                <li>
                                                    <a
                                                        href={`${
                                                            profile &&
                                                            profile.social
                                                                .twitter
                                                        }`}
                                                        title='Twitter'
                                                        data-tippy-placement='top'
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        <i className='icon-feather-twitter'></i>
                                                    </a>
                                                </li>
                                            ) : null}
                                            {profile &&
                                            profile.social.instagram ? (
                                                <li>
                                                    <a
                                                        href={`${
                                                            profile &&
                                                            profile.social
                                                                .instagram
                                                        }`}
                                                        title='Instagram'
                                                        data-tippy-placement='top'
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        <i className='icon-line-awesome-instagram'></i>
                                                    </a>
                                                </li>
                                            ) : null}
                                            {profile &&
                                            profile.social.facebook ? (
                                                <li>
                                                    <a
                                                        href={`${
                                                            profile &&
                                                            profile.social
                                                                .facebook
                                                        }`}
                                                        title='Facebook'
                                                        data-tippy-placement='top'
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                    >
                                                        <i className='icon-feather-facebook'></i>
                                                    </a>
                                                </li>
                                            ) : null}
                                        </ul>
                                    ) : (
                                        <p>
                                            This user doesn't have social
                                            networks to display.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className='sidebar-widget'>
                                <h3>Skills</h3>
                                <div className='task-tags'>
                                    {profile &&
                                        profile.skills.map((skill, index) => (
                                            <span key={index}>{skill}</span>
                                        ))}
                                </div>
                            </div>
                            <div className='sidebar-widget'>
                                <h3>Certifications</h3>
                                <div className='task-tags'>
                                    {profile &&
                                        profile.certifications.map(
                                            (certification, index) => (
                                                <span key={index}>
                                                    {certification}
                                                </span>
                                            )
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default withRouter(ProfileItem);
