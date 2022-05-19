import React, { useContext, useEffect, Fragment } from 'react';

// Context
import PromoContext from '../../context/promo/promoContext';

// Parts
import PromoItem from './PromoItem';
import EditForm from './EditForm';
import Spinning from '../extras/Spinning';

const Promos = (props) => {
    const promoContext = useContext(PromoContext);

    const { promos, filtered, getPromos, loading } = promoContext;

    useEffect(() => {
        getPromos();
        // eslint-disable-next-line
    }, []);

    return promos !== null && promos.length === 0 && !loading ? (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='dashboard-box margin-top-0'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i> Promos
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
                                You don't have Promos yet.
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
                                <i className='icon-feather-folder'></i> Promos
                                List
                            </h3>
                        </div>

                        <div className='content'>
                            {promos && promos !== null && !loading ? (
                                <ul className='dashboard-box-list'>
                                    {filtered && filtered !== null
                                        ? filtered
                                              .sort(
                                                  (
                                                      { order: prevOr },
                                                      { order: curOr }
                                                  ) => prevOr - curOr
                                              )
                                              .map((promo) => (
                                                  <PromoItem
                                                      key={promo.order}
                                                      promo={promo}
                                                  />
                                              ))
                                        : promos
                                              .sort(
                                                  (
                                                      { order: prevOr },
                                                      { order: curOr }
                                                  ) => prevOr - curOr
                                              )
                                              .map((promo) => (
                                                  <PromoItem
                                                      key={promo.order}
                                                      promo={promo}
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

export default Promos;
