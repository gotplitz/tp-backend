import React, { useContext, useEffect, Fragment } from 'react';

import TeamContext from '../../context/team/teamContext';
// Parts
import TeamItem from './TeamItem';
import TeamEdit from './TeamEdit';
import Spinning from '../extras/Spinning';

const Teams = (props) => {
    const teamContext = useContext(TeamContext);
    const { teams, filtered, getTeams, loading } = teamContext;

    useEffect(() => {
        getTeams();
        // eslint-disable-next-line
    }, []);
    return teams !== null && teams.length === 0 && !loading ? (
        <Fragment>
            <div className='row'>
                <div className='col-xl-12'>
                    <div className='dashboard-box margin-top-0'>
                        <div className='headline'>
                            <h3>
                                <i className='icon-feather-folder'></i> Team
                                Members List
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
                                You don't have a Team yet
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (
        <div className='row'>
            <div className='col-xl-12'>
                <TeamEdit pcurrent={props.pcurrent} />
                <div className='dashboard-box'>
                    <div className='headline'>
                        <h3>
                            <i className='icon-feather-folder'></i> Team Members
                            List
                        </h3>
                    </div>

                    <div className='content'>
                        {teams && teams !== null && !loading ? (
                            <ul className='dashboard-box-list'>
                                {filtered && filtered !== null
                                    ? filtered
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((team) => (
                                              <TeamItem
                                                  key={team._id}
                                                  team={team}
                                              />
                                          ))
                                    : teams
                                          .sort(
                                              (
                                                  { index: prevOr },
                                                  { index: curOr }
                                              ) => prevOr - curOr
                                          )
                                          .map((team) => (
                                              <TeamItem
                                                  key={team._id}
                                                  team={team}
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

export default Teams;
