import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

// Contexts
import LogContext from '../../context/log/logContext';
import ProfileContext from '../../context/profile/profileContext';
import EmailContext from '../../context/email/emailContext';

const DashboardLists = () => {
    const logContext = useContext(LogContext);
    const profileContext = useContext(ProfileContext);
    const emailContext = useContext(EmailContext);

    const { getHistories, logs } = logContext;
    const { getProfiles, profiles } = profileContext;
    const { getEmails, emails } = emailContext;

    useEffect(() => {
        getHistories();
        getProfiles();
        getEmails();

        // eslint-disable-next-line
    }, []);
    return (
        <div className='row'>
            {/* List of Activity logs in the Dashboard main page */}
            <div className='col-xl-6'>
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-archive'></i> Activity
                            Logs
                        </h3>
                        <Link
                            to='/history-logs'
                            className='mark-as-read'
                            data-tippy-placement='left'
                            title='Read All'
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <i className='icon-feather-arrow-right'></i>
                        </Link>
                    </div>
                    <div className='content'>
                        <ul className='dashboard-box-list'>
                            {logs &&
                                logs.slice(0, 7).map((log) => (
                                    <li key={log._id}>
                                        <span className='notification-icon'>
                                            {log.type === 'error' ? (
                                                <i className='icon-feather-slash'></i>
                                            ) : (
                                                <i className='icon-feather-check-circle'></i>
                                            )}
                                        </span>
                                        <span className='notification-text'>
                                            <strong
                                                dangerouslySetInnerHTML={{
                                                    __html: log.msg,
                                                }}
                                            ></strong>{' '}
                                            | User: {log.name}{' '}
                                            <small>
                                                | Date:{' '}
                                                <Moment format='MM/DD/YYYY'>
                                                    {log.date}
                                                </Moment>
                                            </small>
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className='col-xl-6'>
                {/* List of the last 10 most recent emails*/}
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-inbox'></i> Inbox
                        </h3>
                        <Link
                            to='/emails'
                            className='mark-as-read'
                            data-tippy-placement='left'
                            title='All Submissions'
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <i className='icon-feather-arrow-right'></i>
                        </Link>
                    </div>
                    <div className='content'>
                        <ul className='dashboard-box-list'>
                            {emails &&
                                emails
                                    .slice(0, 5)
                                    .map((email) => (
                                        <li
                                            key={email._id}
                                            style={{
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                            }}
                                        >
                                            <div className='notification-text'>
                                                <strong>
                                                    {email.fullname}{' '}
                                                </strong>{' '}
                                                <small>
                                                    Date of submission:{' '}
                                                    <Moment format='MMMM dd, YYYY at hh:mm a'>
                                                        {email.date}
                                                    </Moment>
                                                </small>
                                                <br />
                                                <p>{email.message}</p>
                                            </div>
                                            <div className='notification-text'>
                                                <a
                                                    href={`mailto:${email.clientemail}`}
                                                >
                                                    {email.clientemail}
                                                </a>{' '}
                                                |{' '}
                                                <a
                                                    href={`tel:${email.phone
                                                        .replace(/&/g, '')
                                                        .replace(
                                                            /[!-/:-@[-^`().{-~]+/g,
                                                            ''
                                                        )
                                                        .replace(/ /g, '')}`}
                                                >
                                                    {email.phone}
                                                </a>{' '}
                                                | Type of email:{' '}
                                                <b>
                                                    {email.origin === 'contact'
                                                        ? 'Client'
                                                        : 'Developer'}
                                                </b>
                                            </div>
                                        </li>
                                    ))
                                    .reverse()}
                        </ul>
                    </div>
                </div>

                {/* List of users */}
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-list'></i> Recent users
                        </h3>
                        <Link
                            to='/all-profiles'
                            className='mark-as-read'
                            data-tippy-placement='left'
                            title='Full List'
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <i className='icon-feather-arrow-right'></i>
                        </Link>
                    </div>
                    <div className='content'>
                        <ul className='dashboard-box-list'>
                            {profiles &&
                                profiles
                                    .slice(0, 7)
                                    .map((profile, index) => (
                                        <li key={index}>
                                            <Link
                                                to={`/all-profiles/${profile.user._id}`}
                                            >
                                                <span
                                                    className='notification-icon'
                                                    style={{
                                                        backgroundColor:
                                                            'transparent',
                                                    }}
                                                >
                                                    <div className='user-avatar'>
                                                        <img
                                                            src={`/uploads/${profile.user.photo}`}
                                                            alt={
                                                                profile.user
                                                                    .name
                                                            }
                                                        />
                                                    </div>
                                                </span>
                                                <span className='notification-text'>
                                                    <strong>
                                                        {profile.user.name}{' '}
                                                        {profile.user.lastname}
                                                    </strong>{' '}
                                                    <small>
                                                        Member since:{' '}
                                                        <Moment format='MM/DD/YYYY'>
                                                            {profile.user.date}
                                                        </Moment>
                                                    </small>
                                                    <br />
                                                    {profile.title}{' '}
                                                </span>
                                            </Link>
                                        </li>
                                    ))
                                    .reverse()}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLists;
