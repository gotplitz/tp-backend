import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import EmailContext from '../../context/email/emailContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

const EmailItem = ({ email }) => {
    const emailContext = useContext(EmailContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { deleteEmail } = emailContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    const { _id, fullname, clientemail, phone, message, date } = email;

    const onDelete = () => {
        setLog({
            msg: `Email from ${fullname} has been deleted`,
            type: 'warning',
        });
        deleteEmail(_id);
        setAlert('The Email Has Been Removed', 'warning');
    };

    return (
        <Fragment>
            <li>
                <div className='post-types-listing'>
                    <div className='post-types-listing-details'>
                        <div className='post-types-listing-description'>
                            <h3 className='post-types-listing-title'>
                                {fullname}
                            </h3>
                            <div
                                className='post-types-listing-text'
                                dangerouslySetInnerHTML={{
                                    __html: message,
                                }}
                                style={{ whiteSpace: 'pre-wrap' }}
                            ></div>
                        </div>
                    </div>

                    <div className='post-types-listing-footer'>
                        <ul
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <li>
                                Client email:
                                <br />
                                <a href={`mailto:${clientemail}`}>
                                    <b>{clientemail}</b>
                                </a>
                            </li>
                            <li>
                                Phone Number:
                                <br />
                                <a
                                    href={`tel:${phone
                                        .replace(/&/g, '')
                                        .replace(/[!-/:-@[-^`().{-~]+/g, '')
                                        .replace(/ /g, '')}`}
                                >
                                    <b>{phone}</b>
                                </a>
                            </li>

                            <li>
                                Submitted date:
                                <br />
                                <b>
                                    <Moment format='MMMM DD, YY | hh:mm a'>
                                        {date}
                                    </Moment>
                                </b>
                            </li>
                            <li>
                                <a
                                    href='#!'
                                    onClick={onDelete}
                                    className='button red ripple-effect ico'
                                    title='Remove Email'
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

EmailItem.propTypes = {
    email: PropTypes.object.isRequired,
};

export default EmailItem;
