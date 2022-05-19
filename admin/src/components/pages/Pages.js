import React, { useContext, useEffect, Fragment } from 'react';

import PageContext from '../../context/page/pageContext';
// Parts
import PageItem from './PageItem';
import PageEdit from './PageEdit';
import Spinning from '../extras/Spinning';

const Pages = (props) => {
    const pageContext = useContext(PageContext);
    const { pages, filtered, getPages, loading } = pageContext;

    useEffect(() => {
        getPages();
        // eslint-disable-next-line
    }, []);
    return pages !== null && pages.length === 0 && !loading ? (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='dashboard-box margin-top-0'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i> Pages
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
                                You don't have Page Posts yet
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <div className='row'>
            <div className='col-xl-12'>
                <PageEdit pcurrent={props.pcurrent} />
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-folder'></i> Page Pages
                            List
                        </h3>
                    </div>

                    <div className='content'>
                        {pages && pages !== null && !loading ? (
                            <ul className='dashboard-box-list'>
                                {filtered && filtered !== null
                                    ? filtered
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((page) => (
                                              <PageItem
                                                  key={page._id}
                                                  page={page}
                                              />
                                          ))
                                    : pages
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((page) => (
                                              <PageItem
                                                  key={page._id}
                                                  page={page}
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

export default Pages;
