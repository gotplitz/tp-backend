import React, { useContext, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'react-moment';

// Contexts
import AuthContext from '../../context/auth/authContext';
import TeamContext from '../../context/team/teamContext';

// Page parts
import Spinning from '../extras/Spinning';
import Footer from '../layout/Footer';

const FullTeam = ({ match, history }) => {
    const authContext = useContext(AuthContext);
    const teamContext = useContext(TeamContext);

    const { loadUser } = authContext;
    const { getTeamByLink, team, loading } = teamContext;

    useEffect(() => {
        getTeamByLink(match.params.teamlink);
        loadUser();

        // eslint-disable-next-line
    }, []);

    const onClick = () => {
        return <Redirect to={`/${history.goBack()}`} />;
    };

    return loading && team === null ? (
        <Spinning />
    ) : (
        <Fragment>
            <div className='dashboard-content-container'>
                <div className='single-page-header worker-header'>
                    <div className='header-bg'></div>
                    <div
                        style={{
                            backgroundImage: `url('/uploads/${
                                team && team.featuredimg
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
                                                    team && team.photo
                                                }`}
                                                alt=''
                                            />
                                        </div>
                                        <div className='header-details'>
                                            <h3>
                                                {team && team.teamtitle}
                                                <span>
                                                    Published by:{' '}
                                                    {team && team.name}{' '}
                                                    {team && team.lastname}{' '}
                                                </span>
                                            </h3>
                                            <ul
                                                style={{
                                                    display: 'flex',
                                                    alignContent: 'flex-start',
                                                }}
                                            >
                                                {/* <li>
                                                    {team &&
                                                        team.teamcat.map(
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
                                                        <Link to='/teams'>
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
                            {/* Body of the team */}
                            <div className='single-page-section'>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: team && team.teamdetails,
                                    }}
                                ></div>
                            </div>

                            {/* Dates */}

                            <div className='boxed-list'>
                                {team &&
                                    team.extraboxes.length > 0 &&
                                    team.extraboxes.map((eb, index) => (
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
                                        <strong>{team && team.teamsubt}</strong>
                                        <span>Subtitle</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            {team && team.extraboxes.length > 0
                                                ? team.extraboxes.length
                                                : 'No Metaboxes'}
                                        </strong>
                                        <span>Metaboxes</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            {team && team.teamstatus
                                                ? 'Public'
                                                : 'Hidden'}
                                        </strong>
                                        <span>Front-end Visibility</span>
                                    </div>
                                    <div className='overview-item'>
                                        <strong>
                                            <Moment format='MMMM DD, YYYY'>
                                                {team && team.date}
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
                        to='/teams'
                        className='button'
                        style={{ marginLeft: 10 }}
                    >
                        Back to Teams List
                    </Link>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
};

export default FullTeam;
