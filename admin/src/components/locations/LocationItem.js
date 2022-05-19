import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import LocationContext from '../../context/location/locationContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

const LocationItem = ({ location }) => {
    const locationContext = useContext(LocationContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { deleteLocation, setPcurrent, clearPcurrent } = locationContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    const {
        _id,
        locationstatus,
        featuredimg,
        locationtitle,
        locationlink,
        locationsubt,
        locationdetails,
        user,
        name,
        lastname,
    } = location;

    const onDelete = () => {
        setLog({
            msg: `Location ${locationtitle} has been deleted`,
            type: 'warning',
        });
        deleteLocation(_id);
        clearPcurrent();
        setAlert('The Location Has Been Removed', 'warning');
    };

    const openModal = () => {
        setPcurrent(location);
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
                                alt={locationtitle}
                            />
                        </div>

                        <div className='post-types-listing-description'>
                            <div className='status-visibility'>
                                {locationstatus === true ? (
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
                                {locationtitle}
                            </h3>
                            <div
                                className='post-types-listing-text overflow'
                                dangerouslySetInnerHTML={{
                                    __html: locationdetails,
                                }}
                                style={{ whiteSpace: 'pre-wrap' }}
                            ></div>
                            <div style={{ display: 'inline-flex' }}>
                                <br />
                                <Link
                                    to={{
                                        pathname: `/locations/${locationlink}`,
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
                                Subtitle: <b>{locationsubt}</b>
                            </li>
                            <li>
                                Posted on:{' '}
                                <b>
                                    <Moment format='MM/DD/YY'>
                                        {location.date}
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
                                    title='Edit Location'
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
                                    title='Remove Location'
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

LocationItem.propTypes = {
    location: PropTypes.object.isRequired,
};

export default LocationItem;
