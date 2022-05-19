import React, { useContext, useEffect, Fragment } from 'react';

// Context
import SliderContext from '../../context/slider/sliderContext';

// Parts
import SliderItem from './SliderItem';
import EditForm from './EditForm';
import Spinning from '../extras/Spinning';

const Sliders = (props) => {
    const sliderContext = useContext(SliderContext);

    const { sliders, filtered, getSliders, loading } = sliderContext;

    useEffect(() => {
        getSliders();
        // eslint-disable-next-line
    }, []);

    return sliders !== null && sliders.length === 0 && !loading ? (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='dashboard-box margin-top-0'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i> Sliders
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
                                You don't have Sliders yet.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <EditForm current={props.current} />
                    <div className='dashboard-box'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i> Sliders
                                List
                            </h3>
                        </div>

                        <div className='content'>
                            {sliders && sliders !== null && !loading ? (
                                <ul className='dashboard-box-list'>
                                    {filtered && filtered !== null
                                        ? filtered
                                              .sort(
                                                  (
                                                      { order: prevOr },
                                                      { order: curOr }
                                                  ) => prevOr - curOr
                                              )
                                              .map((slider) => (
                                                  <SliderItem
                                                      key={slider.order}
                                                      slider={slider}
                                                  />
                                              ))
                                        : sliders
                                              .sort(
                                                  (
                                                      { order: prevOr },
                                                      { order: curOr }
                                                  ) => prevOr - curOr
                                              )
                                              .map((slider) => (
                                                  <SliderItem
                                                      key={slider.order}
                                                      slider={slider}
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
        </Fragment>
    );
};

export default Sliders;
