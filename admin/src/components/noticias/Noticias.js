import React, { useContext, useEffect, Fragment } from 'react';

import NoticiaContext from '../../context/noticia/noticiaContext';
// Parts
import NoticiaItem from './NoticiaItem';
import NoticiaEdit from './NoticiaEdit';
import Spinning from '../extras/Spinning';

const Noticias = (props) => {
    const noticiaContext = useContext(NoticiaContext);
    const { noticias, filtered, getNoticias, loading } = noticiaContext;

    useEffect(() => {
        getNoticias();
        // eslint-disable-next-line
    }, []);
    return noticias !== null && noticias.length === 0 && !loading ? (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='dashboard-box margin-top-0'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i> Posts
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
                                You don't have Posts yet
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <div className='row'>
            <div className='col-xl-12'>
                <NoticiaEdit ncurrent={props.ncurrent} />
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-folder'></i> Posts List
                        </h3>
                    </div>

                    <div className='content'>
                        {noticias && noticias !== null && !loading ? (
                            <ul className='dashboard-box-list'>
                                {filtered && filtered !== null
                                    ? filtered
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((noticia) => (
                                              <NoticiaItem
                                                  key={noticia._id}
                                                  noticia={noticia}
                                              />
                                          ))
                                    : noticias
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((noticia) => (
                                              <NoticiaItem
                                                  key={noticia._id}
                                                  noticia={noticia}
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

export default Noticias;
