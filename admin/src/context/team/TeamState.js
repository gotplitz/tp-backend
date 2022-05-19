import React, { useReducer } from 'react';
import axios from 'axios';

import TeamContext from './teamContext';
import teamReducer from './teamReducer';
import {
    ADD_TEAM,
    TEAM_ERROR,
    SET_TEAM,
    CLEAR_CURPRO,
    UPDATE_TEAM,
    DELETE_TEAM,
    FILTER_TEAM,
    CLEAR_FILTER,
    GET_TEAMS,
    CLEAR_TEAMS,
    GET_TEAM,
} from '../types';

const TeamState = (props) => {
    const initialState = {
        teams: null,
        team: null,
        pcurrent: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(teamReducer, initialState);

    // Get Teams
    const getTeams = async () => {
        try {
            const res = await axios.get('/api/teams');

            dispatch({ type: GET_TEAMS, payload: res.data });
        } catch (err) {
            dispatch({ type: TEAM_ERROR, payload: err.response.msg });
        }
    };

    // Get team by link
    const getTeamByLink = async (teamlink) => {
        try {
            const res = await axios.get(`/api/teams/${teamlink}`);

            dispatch({
                type: GET_TEAM,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: TEAM_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Add Team
    const addTeam = async (newteam) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/teams', newteam, config);

            dispatch({ type: ADD_TEAM, payload: res.data });
        } catch (err) {
            dispatch({ type: TEAM_ERROR, payload: err.response.msg });
        }
    };

    // Remove Team
    const deleteTeam = async (id) => {
        try {
            await axios.delete(`/api/teams/${id}`);

            dispatch({
                type: DELETE_TEAM,
                payload: id,
            });
        } catch (err) {
            dispatch({ type: TEAM_ERROR, payload: err.response.msg });
        }
    };

    // Update Team
    const updateTeam = async (team) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put(
                `/api/teams/update/${team._id}`,
                team,
                config
            );

            dispatch({ type: UPDATE_TEAM, payload: res.data });
        } catch (err) {
            dispatch({ type: TEAM_ERROR, payload: err.response.msg });
        }
    };

    // Clear Teams
    const clearTeams = () => {
        dispatch({ type: CLEAR_TEAMS });
    };

    // Set Pcurrent
    const setPcurrent = (team) => {
        dispatch({ type: SET_TEAM, payload: team });
    };

    // Clear Pcurrent
    const clearPcurrent = () => {
        dispatch({ type: CLEAR_CURPRO });
    };

    // Filter Team
    const filterTeams = (text) => {
        dispatch({ type: FILTER_TEAM, payload: text });
    };

    // Clear Pcurrent
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <TeamContext.Provider
            value={{
                teams: state.teams,
                team: state.team,
                pcurrent: state.pcurrent,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getTeamByLink,
                getTeams,
                addTeam,
                deleteTeam,
                setPcurrent,
                clearPcurrent,
                updateTeam,
                filterTeams,
                clearFilter,
                clearTeams,
            }}
        >
            {props.children}
        </TeamContext.Provider>
    );
};

export default TeamState;
