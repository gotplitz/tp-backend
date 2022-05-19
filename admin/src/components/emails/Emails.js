import React, { useContext, useEffect, Fragment } from 'react';

import EmailContext from '../../context/email/emailContext';
// Parts
import EmailItem from './EmailItem';
import Spinning from '../extras/Spinning';

const Emails = (props) => {
    const emailContext = useContext(EmailContext);
    const { emails, filtered, getEmails, loading } = emailContext;

    useEffect(() => {
        getEmails();
        // eslint-disable-next-line
    }, []);
    return emails !== null && emails.length === 0 && !loading ? (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='dashboard-box margin-top-0'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i> Email
                                Submissions List
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
                                You don't have 'Contact Us' submissions yet
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <div className='row'>
            <div className='col-xl-12'>
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-folder'></i> Email
                            Submissions List
                        </h3>
                    </div>

                    <div className='content'>
                        {emails && emails !== null && !loading ? (
                            <ul className='dashboard-box-list'>
                                {filtered && filtered !== null
                                    ? filtered
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((email) => (
                                              <EmailItem
                                                  key={email._id}
                                                  email={email}
                                              />
                                          ))
                                    : emails
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((email) => (
                                              <EmailItem
                                                  key={email._id}
                                                  email={email}
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

export default Emails;
