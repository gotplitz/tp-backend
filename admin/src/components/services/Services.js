import React, { useContext, useEffect, Fragment } from 'react';

import ServiceContext from '../../context/service/serviceContext';
// Parts
import ServiceItem from './ServiceItem';
import ServiceEdit from './ServiceEdit';
import Spinning from '../extras/Spinning';

const Services = (props) => {
    const serviceContext = useContext(ServiceContext);
    const { services, filtered, getServices, loading } = serviceContext;

    useEffect(() => {
        getServices();
        // eslint-disable-next-line
    }, []);
    return services !== null && services.length === 0 && !loading ? (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='dashboard-box margin-top-0'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i> Services
                                List
                            </h3>
                        </div>

                        <div className='content'>
                            <h4
                                style={{
                                    margin: '30px auto 0',
                                    textAlign: 'center',
                                    paddingBottom: 30,
                                }}
                            >
                                You don't have Service Posts yet
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <div className='row'>
            <div className='col-xl-12'>
                <ServiceEdit pcurrent={props.pcurrent} />
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-folder'></i> Service
                            Pages List
                        </h3>
                    </div>

                    <div className='content'>
                        {services && services !== null && !loading ? (
                            <ul className='dashboard-box-list'>
                                {filtered && filtered !== null
                                    ? filtered
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((service) => (
                                              <ServiceItem
                                                  key={service._id}
                                                  service={service}
                                              />
                                          ))
                                    : services
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((service) => (
                                              <ServiceItem
                                                  key={service._id}
                                                  service={service}
                                              />
                                          ))}
                            </ul>
                        ) : (
                            <Spinning />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
