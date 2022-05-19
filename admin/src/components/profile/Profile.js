import React, { useContext, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Contexts
import ProfileContext from '../../context/profile/profileContext';
import AuthContext from '../../context/auth/authContext';

// Page parts
import Spinning from '../extras/Spinning';
import Footer from '../layout/Footer';

const Profile = ({ match, history }) => {
    const profileContext = useContext(ProfileContext);
    const authContext = useContext(AuthContext);
    const { user, isAuthenticated } = authContext;
    const { getProfileById, profile, loading } = profileContext;

    useEffect(() => {
        getProfileById(match.params.id);

        // eslint-disable-next-line
    }, [match.params.id]);

    const onClick = () => {
        return <Redirect to={`/${history.goBack()}`} />;
    };

    return loading ? (
        <Spinning />
    ) : (
        <Fragment>
            <div className='dashboard-content-container'>
                <div className='single-page-header worker-header'>
                    <div className='container' style={{ padding: '0 50px' }}>
                        <div className='row'>
                            <div className='col-xl-12 col-lg-12'>
                                <div className='single-page-header-inner'>
                                    <div className='left-side'>
                                        <div className='header-image worker-avatar'>
                                            <img
                                                src={`/uploads/${
                                                    profile &&
                                                    profile.user.photo
                                                }`}
                                                alt=''
                                            />
                                        </div>
                                        <div className='header-details'>
                                            <h3>
                                                {profile && profile.user.name}{' '}
                                                {profile &&
                                                    profile.user.lastname}{' '}
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
                                                        <Link to='/all-profiles'>
                                                            List
                                                        </Link>
                                                    </li>
                                                    {isAuthenticated &&
                                                        user &&
                                                        user._id ===
                                                            profile.user
                                                                ._id && (
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
                        </div>

                        {/* Right side bar with details */}

                        <div className='col-xl-5 col-lg-5'>
                            <div className='sidebar-container'>
                                <div className='profile-overview'>
                                    <div className='overview-item'>
                                        <strong>
                                            <a
                                                href={`tel:${
                                                    profile &&
                                                    profile.user.phone
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
                                                    profile &&
                                                    profile.user.email
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
                                            profile.skills.map(
                                                (skill, index) => (
                                                    <span key={index}>
                                                        {skill}
                                                    </span>
                                                )
                                            )}
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

                <div className='container' style={{ padding: '0 50px' }}>
                    <Link
                        to='/all-profiles'
                        className='button'
                        style={{ marginLeft: 10 }}
                    >
                        Back to Profiles List
                    </Link>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
};

export default Profile;
