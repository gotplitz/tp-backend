import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Truncate from 'react-truncate';

import NoticiaContext from '../../context/noticia/noticiaContext';
import PlaceHolder from '../../assets/images/big-placeholder.jpg';

const NoticiaItem = ({ noticia }) => {
    const noticiaContext = useContext(NoticiaContext);
    const { deleteNoticia, setNcurrent, clearNcurrent } = noticiaContext;

    const {
        _id,
        newsstatus,
        featuredimg,
        newstitle,
        newslink,
        newsintro,
        newscat,
        name,
        lastname,
        date,
        user,
    } = noticia;

    const onDelete = () => {
        deleteNoticia(_id);
        clearNcurrent();
    };

    const openModal = () => {
        setNcurrent(noticia);
        var showmodal = document.getElementById('small-dialog');
        showmodal.classList.toggle('mfp-hide');
    };

    return (
        <Fragment>
            <li>
                <div className='post-types-listing'>
                    <div className='post-types-listing-details'>
                        <div className='post-types-listing-company-logo'>
                            {featuredimg === 'big-placeholder.jpg' ? (
                                <img src={PlaceHolder} alt={newstitle} />
                            ) : (
                                <img
                                    src={`/uploads/${featuredimg}`}
                                    alt={newstitle}
                                />
                            )}
                        </div>

                        <div className='post-types-listing-description'>
                            <div className='status-visibility'>
                                {newsstatus === true ? (
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
                                {newstitle}
                            </h3>
                            <div>
                                <Truncate lines={3}>
                                    <div
                                        className='post-types-listing-text overflow'
                                        dangerouslySetInnerHTML={{
                                            __html: newsintro,
                                        }}
                                    ></div>
                                </Truncate>
                            </div>

                            <div className='task-tags'>
                                {newscat &&
                                    newscat.map((newscat, index) => (
                                        <span key={index}>{newscat}</span>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className='post-types-listing-footer'>
                        <ul>
                            <li>
                                <i className='icon-feather-calendar'></i> Posted
                                on:{' '}
                                <Moment format='MMMM DD, yyyy'>{date}</Moment>
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
                                    title='Edit Noticia'
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
                                    title='Remove Noticia'
                                    data-tippy-placement='top'
                                >
                                    <i className='icon-feather-trash-2'></i>
                                </a>
                            </li>
                            <li>
                                <Link
                                    to={`/news/${newslink}`}
                                    className='button ripple-effect button-sliding-icon'
                                >
                                    See Full Item{' '}
                                    <i className='icon-line-awesome-angle-right'></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </Fragment>
    );
};

NoticiaItem.propTypes = {
    noticia: PropTypes.object.isRequired,
};

export default NoticiaItem;
