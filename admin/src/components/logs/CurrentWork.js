import React, { useContext, useEffect, Fragment } from 'react';
import LogContext from '../../context/log/logContext';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CurrentWork = () => {
    const logContext = useContext(LogContext);
    const { logs, getHistories } = logContext;

    useEffect(() => {
        getHistories();

        // eslint-disable-next-line
    }, []);

    const today = new Date();
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
    const logAR = [];

    logs &&
        logs.map((log) => (
            <Fragment>
                {new Date(log.date).toLocaleDateString('en-EN', options) ===
                    today.toLocaleDateString('en-EN', options) &&
                    logAR.push(log)}
            </Fragment>
        ));

    const ifsIcons = (log) => {
        if (log.type === 'error') {
            return <i className='icon-feather-slash'></i>;
        } else if (log.type === 'success') {
            return <i className='icon-feather-check-circle'></i>;
        } else {
            return <i className='icon-line-awesome-warning'></i>;
        }
    };

    return (
        <div className='header-notifications'>
            <div className='header-notifications-trigger'>
                <button>
                    <i className='icon-line-awesome-history'></i>
                    <span>{logAR && logAR.length}</span>
                </button>
            </div>

            <div className='header-notifications-dropdown'>
                <div className='header-notifications-headline'>
                    <h4>Today's Activity</h4>
                    <Link
                        to='/history-logs'
                        className='mark-as-read ripple-effect-dark'
                        title='Read full log'
                        data-tippy-placement='left'
                    >
                        <i className='icon-feather-check-square'></i>
                    </Link>
                </div>

                <div className='header-notifications-content'>
                    <div className='header-notifications-scroll' data-simplebar>
                        <ul>
                            {logs &&
                                logs
                                    .sort(
                                        ({ date: prevOr }, { date: curOr }) =>
                                            prevOr - curOr
                                    )
                                    .slice(0, 10)
                                    .map((log) => {
                                        const logDate = log.date;
                                        const formatDate = new Date(logDate);

                                        if (
                                            formatDate.toLocaleDateString(
                                                'en-EN',
                                                options
                                            ) ===
                                            today.toLocaleDateString(
                                                'en-EN',
                                                options
                                            )
                                        ) {
                                            return (
                                                <li
                                                    key={log._id}
                                                    className='notifications-not-read'
                                                >
                                                    <a href='#!'>
                                                        <span className='notification-icon'>
                                                            {ifsIcons(log)}
                                                        </span>
                                                        <span className='notification-text'>
                                                            <span className='color'>
                                                                {log.msg}
                                                            </span>{' '}
                                                            <Moment format='MM/DD/YYYY'>
                                                                {log.date}
                                                            </Moment>{' '}
                                                            <strong>
                                                                User: {log.name}
                                                            </strong>
                                                        </span>
                                                    </a>
                                                </li>
                                            );
                                        }

                                        return true;
                                    })}
                        </ul>
                    </div>
                </div>

                <Link
                    to='/history-logs'
                    className='header-notifications-button ripple-effect button-sliding-icon'
                >
                    View History Log
                    <i className='icon-material-outline-arrow-right-alt'></i>
                </Link>
            </div>
        </div>
    );
};

export default CurrentWork;
