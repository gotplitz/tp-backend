import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import ServiceContext from '../../context/service/serviceContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

const ServiceItem = ({ service }) => {
    const serviceContext = useContext(ServiceContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { deleteService, setPcurrent, clearPcurrent } = serviceContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    const {
        _id,
        servicestatus,
        featuredimg,
        servicetitle,
        servicelink,
        menuname,
        servicesubt,
        servicedetails,
    } = service;

    const onDelete = () => {
        setLog({
            msg: `Service post ${servicetitle} has been deleted`,
            type: 'warning',
        });
        deleteService(_id);
        clearPcurrent();
        setAlert('The Service Post Has Been Removed', 'warning');
    };

    const openModal = () => {
        setPcurrent(service);
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
                                alt={servicetitle}
                            />
                        </div>

                        <div className='post-types-listing-description'>
                            <div className='status-visibility'>
                                {servicestatus === true ? (
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
                                {servicetitle}
                            </h3>
                            <div
                                className='post-types-listing-text overflow'
                                dangerouslySetInnerHTML={{
                                    __html: servicedetails,
                                }}
                                style={{ whiteSpace: 'pre-wrap' }}
                            ></div>
                            <div style={{ display: 'inline-flex' }}>
                                <br />
                                <Link
                                    to={{
                                        pathname: `/services/${servicelink}`,
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
                                Navigation Label: <b>{menuname}</b>
                            </li>
                            <li>
                                Subtitle: <b>{servicesubt}</b>
                            </li>
                            <li>
                                Posted on:{' '}
                                <b>
                                    <Moment format='MM/DD/YY'>
                                        {service.date}
                                    </Moment>
                                </b>
                            </li>

                            <li>
                                <a
                                    href='#!'
                                    onClick={() => openModal()}
                                    className='button dark ripple-effect ico'
                                    title='Edit This Post'
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
                                    title='Remove This Post'
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

ServiceItem.propTypes = {
    service: PropTypes.object.isRequired,
};

export default ServiceItem;
