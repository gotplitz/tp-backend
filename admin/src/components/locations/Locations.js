import React, { useContext, useEffect, Fragment } from 'react';

import LocationContext from '../../context/location/locationContext';
// Parts
import LocationItem from './LocationItem';
import LocationEdit from './LocationEdit';
import Spinning from '../extras/Spinning';

const Locations = (props) => {
    const locationContext = useContext(LocationContext);
    const { locations, filtered, getLocations, loading } = locationContext;

    useEffect(() => {
        getLocations();
        // eslint-disable-next-line
    }, []);
    return locations !== null && locations.length === 0 && !loading ? (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='dashboard-box margin-top-0'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i>{' '}
                                Locations List
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
                                You haven't posted Locations yet
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <div className='row'>
            <div className='col-xl-12'>
                <LocationEdit dcurrent={props.dcurrent} />
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-folder'></i> Locations
                            List
                        </h3>
                    </div>

                    <div className='content'>
                        {locations && locations !== null && !loading ? (
                            <ul className='dashboard-box-list'>
                                {filtered && filtered !== null
                                    ? filtered
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((location) => (
                                              <LocationItem
                                                  key={location._id}
                                                  location={location}
                                              />
                                          ))
                                    : locations
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((location) => (
                                              <LocationItem
                                                  key={location._id}
                                                  location={location}
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

export default Locations;
