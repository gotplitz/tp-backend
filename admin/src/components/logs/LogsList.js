import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Paginator from 'react-hooks-paginator';

const LogsList = ({ logs }) => {
    const pageLimit = 10;

    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        setCurrentData(logs && logs.slice(offset, offset + pageLimit));
    }, [offset, logs]);

    const ifsIcons = (log) => {
        if (log.type === 'error') {
            return (
                <span className='dashboard-status-button red'>
                    Negative Record
                </span>
            );
        } else if (log.type === 'success') {
            return (
                <span className='dashboard-status-button green'>
                    Positive Record
                </span>
            );
        } else {
            return (
                <span className='dashboard-status-button yellow'>
                    Warning Record
                </span>
            );
        }
    };

    return (
        <Fragment>
            {currentData &&
                currentData.map((log, index) => (
                    <li key={index}>
                        <div className='post-types-listing logs-wrapper'>
                            <div className='post-types-listing-details'>
                                <div className='post-types-listing-description'>
                                    <h3
                                        className='post-types-listing-title'
                                        dangerouslySetInnerHTML={{
                                            __html: `${log.msg}`,
                                        }}
                                    ></h3>

                                    <div className='post-types-listing-footer'>
                                        <ul>
                                            <li>
                                                {ifsIcons(log)}
                                                <br />
                                                <i className='icon-material-outline-date-range'></i>{' '}
                                                <Moment format='MM/DD/YYYY hh:mm a'>
                                                    {log.date}
                                                </Moment>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='buttons-to-right always-visible'>
                            <Link
                                to={`/all-profiles/${log.user}`}
                                className='button ripple-effect'
                            >
                                <i className='icon-feather-user'></i> {log.name}
                            </Link>
                        </div>
                    </li>
                ))}
            <nav className='pagination' style={{ marginTop: 30 }}>
                {logs && (
                    <Paginator
                        totalRecords={logs.length}
                        pageLimit={pageLimit}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageContainerClass=' '
                        pageActiveClass='current-page'
                        pageNextText={
                            <i className='icon-material-outline-keyboard-arrow-right'></i>
                        }
                        pageNextClass='pagination-arrow'
                        pagePrevText={
                            <i className='icon-material-outline-keyboard-arrow-left'></i>
                        }
                        pagePrevClass='pagination-arrow'
                    />
                )}
            </nav>
        </Fragment>
    );
};

export default LogsList;
