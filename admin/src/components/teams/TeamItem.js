import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import TeamContext from '../../context/team/teamContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

const TeamItem = ({ team }) => {
    const teamContext = useContext(TeamContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { deleteTeam, setPcurrent, clearPcurrent } = teamContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    const {
        _id,
        teamstatus,
        featuredimg,
        teamtitle,
        teamlink,
        teamsubt,
        teamdetails,
        user,
        name,
        lastname,
    } = team;

    const onDelete = () => {
        setLog({
            msg: `Team ${teamtitle} has been deleted`,
            type: 'warning',
        });
        deleteTeam(_id);
        clearPcurrent();
        setAlert('The Team Has Been Removed', 'warning');
    };

    const openModal = () => {
        setPcurrent(team);
        var showmodal = document.getElementById('small-dialog');
        showmodal.classList.toggle('mfp-hide');
    };

    return (
        <Fragment>
            <li>
                <div className='post-types-listing'>
                    <div className='post-types-listing-details'>
                        <div className='post-types-listing-company-logo'>
                            <img
                                src={`/uploads/${featuredimg}`}
                                alt={teamtitle}
                            />
                        </div>

                        <div className='post-types-listing-description'>
                            <div className='status-visibility'>
                                {teamstatus === true ? (
                                    <span className='dashboard-status-button green'>
                                        <i className='icon-feather-eye'></i>{' '}
                                        Public
                                    </span>
                                ) : (
                                    <span className='dashboard-status-button yellow'>
                                        <i className='icon-feather-eye-off'></i>{' '}
                                        Draft
                                    </span>
                                )}
                            </div>

                            <h3 className='post-types-listing-title'>
                                {teamtitle}
                            </h3>
                            <div
                                className='post-types-listing-text overflow'
                                dangerouslySetInnerHTML={{
                                    __html: teamdetails,
                                }}
                                style={{ whiteSpace: 'pre-wrap' }}
                            ></div>
                            <div style={{ display: 'inline-flex' }}>
                                <br />
                                <Link
                                    to={{
                                        pathname: `/teams/${teamlink}`,
                                    }}
                                    style={{ margin: '20px auto' }}
                                    className='button ripple-effect button-sliding-icon'
                                >
                                    Full Post
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className='post-types-listing-footer'>
                        <ul>
                            <li>
                                Position or Title: <b>{teamsubt}</b>
                            </li>
                            <li>
                                Posted on:{' '}
                                <b>
                                    <Moment format='MM/DD/YY'>
                                        {team.date}
                                    </Moment>
                                </b>
                            </li>

                            <li>
                                <Link
                                    to={`/all-profiles/${user}`}
                                    className='button gray ripple-effect'
                                    title='Posted by'
                                    data-tippy-placement='top'
                                >
                                    By: {name} {lastname}
                                </Link>
                            </li>

                            <li>
                                <a
                                    href='#!'
                                    onClick={() => openModal()}
                                    className='button dark ripple-effect ico'
                                    title='Edit Team'
                                    data-tippy-placement='top'
                                >
                                    <i className='icon-feather-edit'></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#!'
                                    onClick={onDelete}
                                    className='button red ripple-effect ico'
                                    title='Remove Team'
                                    data-tippy-placement='top'
                                >
                                    <i className='icon-feather-trash-2'></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </Fragment>
    );
};

TeamItem.propTypes = {
    team: PropTypes.object.isRequired,
};

export default TeamItem;
