import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfilesItem = ({
    profile: { departments, certifications, title, user },
}) => {
    return (
        <Fragment>
            <div className='worker'>
                <div className='worker-overview'>
                    <div className='worker-overview-inner'>
                        <div className='worker-avatar'>
                            <Link to={`/all-profiles/${user._id}`}>
                                <img
                                    src={`/uploads/${user.photo}`}
                                    alt={user.name}
                                />
                            </Link>
                        </div>

                        <div className='worker-name'>
                            <h4>
                                <Link to={`/all-profiles/${user._id}`}>
                                    {user.name} {user.lastname}
                                </Link>
                            </h4>
                            <span>{title}</span>
                            <br />
                            {departments.map((departments, index) => (
                                <div
                                    key={index}
                                    className='star-rating'
                                    data-rating={departments}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='worker-details'>
                    <div className='worker-details-list'>
                        <ul>
                            <li>
                                Certifications{' '}
                                <strong>
                                    <ul className='certif'>
                                        {certifications.map(
                                            (certification, index) => (
                                                <li key={index}>
                                                    {certification}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </strong>
                            </li>
                            <li>
                                Phone{' '}
                                <strong>
                                    <a href={`tel:${user.phone}`}>
                                        {user.phone}
                                    </a>
                                </strong>
                            </li>
                            <li>
                                Email{' '}
                                <strong>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </strong>
                            </li>
                        </ul>
                    </div>
                    <Link
                        to={`/all-profiles/${user._id}`}
                        className='button button-sliding-icon ripple-effect'
                    >
                        View Profile{' '}
                        <i className='icon-material-outline-arrow-right-alt'></i>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
};

ProfilesItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfilesItem;
