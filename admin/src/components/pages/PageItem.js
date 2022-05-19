import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import PageContext from '../../context/page/pageContext';
import AlertContext from '../../context/alert/alertContext';
import LogContext from '../../context/log/logContext';

const PageItem = ({ page }) => {
    const pageContext = useContext(PageContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { deletePage, setPcurrent, clearPcurrent } = pageContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    const {
        _id,
        pagestatus,
        featuredimg,
        pagetitle,
        pagelink,
        menuname,
        pagesubt,
        pagedetails,
    } = page;

    const onDelete = () => {
        setLog({
            msg: `Page post ${pagetitle} has been deleted`,
            type: 'warning',
        });
        deletePage(_id);
        clearPcurrent();
        setAlert('The Page Post Has Been Removed', 'warning');
    };

    const openModal = () => {
        setPcurrent(page);
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
                                alt={pagetitle}
                            />
                        </div>

                        <div className='post-types-listing-description'>
                            <div className='status-visibility'>
                                {pagestatus === true ? (
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
                                {pagetitle}
                            </h3>
                            <div
                                className='post-types-listing-text overflow'
                                dangerouslySetInnerHTML={{
                                    __html: pagedetails,
                                }}
                                style={{ whiteSpace: 'pre-wrap' }}
                            ></div>
                            <div style={{ display: 'inline-flex' }}>
                                <br />
                                <Link
                                    to={{
                                        pathname: `/pages/${pagelink}`,
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
                                Subtitle: <b>{pagesubt}</b>
                            </li>
                            <li>
                                Posted on:{' '}
                                <b>
                                    <Moment format='MM/DD/YY'>
                                        {page.date}
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

PageItem.propTypes = {
    page: PropTypes.object.isRequired,
};

export default PageItem;
