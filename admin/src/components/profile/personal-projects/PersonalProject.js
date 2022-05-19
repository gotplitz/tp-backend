import React, { Fragment, useContext, useEffect } from 'react';
import Moment from 'react-moment';

// Context
import AuthContext from '../../../context/auth/authContext';
import ProfileContext from '../../../context/profile/profileContext';
import AlertContext from '../../../context/alert/alertContext';
import LogContext from '../../../context/log/logContext';

// Pages part
import DashNav from '../../layout/DashNav';
import Footer from '../../layout/Footer';

const PersonalProject = () => {
    const authContext = useContext(AuthContext);
    const profileContext = useContext(ProfileContext);
    const alertContext = useContext(AlertContext);
    const logContext = useContext(LogContext);

    const { loadUser } = authContext;
    const { profile, deletePortfolio } = profileContext;
    const { setAlert } = alertContext;
    const { setLog } = logContext;

    useEffect(() => {
        loadUser();

        // eslint-disable-next-line
    }, []);

    const portfolios =
        profile &&
        profile.portfolio.map((portfolio) => (
            <li key={portfolio._id}>
                <div className='post-types-listing width-adjustment'>
                    <div className='post-types-listing-details'>
                        <div className='post-types-listing-description'>
                            <h3 className='post-types-listing-title'>
                                {portfolio.propertyname}
                            </h3>

                            <div className='post-types-listing-footer'>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: portfolio.propertydetails,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className='dashboard-task-info'>
                    <li>
                        <strong>
                            <Moment format='MMMM DD, YYYY'>
                                {portfolio.from}
                            </Moment>
                        </strong>
                        <span>From</span>
                    </li>
                    {portfolio.to === null ? (
                        <li>
                            <strong>Still in process</strong>
                            <span>To</span>
                        </li>
                    ) : (
                        <li>
                            <strong>
                                <Moment format='MMMM DD, YYYY'>
                                    {portfolio.to}
                                </Moment>
                            </strong>
                            <span>To</span>
                        </li>
                    )}
                </ul>

                <div className='buttons-to-right always-visible'>
                    <a
                        href={`https://www.google.com/maps/dir//${portfolio.propertiesubt}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='button ripple-effect'
                    >
                        <i className='icon-feather-map-pin'></i>{' '}
                        {portfolio.propertiesubt}
                    </a>

                    <a
                        href='#!'
                        onClick={() => {
                            setAlert('Item deleted', 'warning');
                            setLog({
                                msg: `One item of the user's portfolio has been deleted`,
                                type: 'warning',
                            });
                            deletePortfolio(portfolio._id);
                        }}
                        className='button gray ripple-effect ico'
                        title='Remove'
                        data-tippy-placement='top'
                    >
                        <i className='icon-feather-trash-2'></i>
                    </a>
                </div>
            </li>
        ));

    return (
        <Fragment>
            <DashNav />
            <div className='dashboard-content-container' data-simplebar>
                <div className='dashboard-content-inner'>
                    <div className='dashboard-headline'>
                        <h3>My Personal Portfolio</h3>
                    </div>

                    <div className='row'>
                        <div className='col-xl-12'>
                            <div className='dashboard-box margin-top-0'>
                                <div className='headline'>
                                    <h3>
                                        <i className='icon-material-outline-assignment'></i>{' '}
                                        Pages List
                                    </h3>
                                </div>

                                <div className='content'>
                                    <ul className='dashboard-box-list'>
                                        {portfolios}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default PersonalProject;
