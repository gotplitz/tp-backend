import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import TestimonialContext from '../../context/testimonial/testimonialContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

const TestimonialItem = ({ testimonial }) => {
    const testimonialContext = useContext(TestimonialContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const {
        deleteTestimonial,
        setPcurrent,
        clearPcurrent,
    } = testimonialContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    const {
        _id,
        testimonialstatus,
        testimonialtitle,
        testimonialcat,
        testimonialbody,
        user,
        name,
        lastname,
    } = testimonial;

    const onDelete = () => {
        setLog(`Short Service ${testimonialtitle} was removed`, 'warning');
        deleteTestimonial(_id);
        clearPcurrent();
        setAlert('The service has been removed', 'warning');
    };

    const openModal = () => {
        setPcurrent(testimonial);
        var showmodal = document.getElementById('small-dialog');
        showmodal.classList.toggle('mfp-hide');
    };

    return (
        <Fragment>
            <li>
                <div className='post-types-listing'>
                    <div className='post-types-listing-details'>
                        <div className='post-types-listing-description'>
                            <div className='status-visibility'>
                                {testimonialstatus === true ? (
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
                                {testimonialtitle}
                            </h3>

                            <div className='task-tags'>
                                {testimonialcat &&
                                    testimonialcat.map(
                                        (testimonialcat, index) => (
                                            <span key={index}>
                                                {testimonialcat}
                                            </span>
                                        )
                                    )}
                            </div>
                        </div>

                        <ul className='testimonial-content'>
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
                                    title='Edit Testimonial'
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
                                    title='Remove Testimonial'
                                    data-tippy-placement='top'
                                >
                                    <i className='icon-feather-trash-2'></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <i className='icon-material-outline-format-quote'></i>{' '}
                        {testimonialbody}
                    </div>
                </div>
            </li>
        </Fragment>
    );
};

TestimonialItem.propTypes = {
    testimonial: PropTypes.object.isRequired,
};

export default TestimonialItem;
