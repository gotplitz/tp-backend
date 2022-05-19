import {
    ADD_TEAM,
    UPDATE_TEAM,
    DELETE_TEAM,
    SET_TEAM,
    CLEAR_CURPRO,
    FILTER_TEAM,
    CLEAR_FILTER,
    TEAM_ERROR,
    GET_TEAMS,
    CLEAR_TEAMS,
    GET_TEAM,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_TEAMS:
            return {
                ...state,
                teams: action.payload,
                loading: false,
            };

        case GET_TEAM:
            return {
                ...state,
                team: action.payload,
                loading: false,
            };

        case ADD_TEAM:
            return {
                ...state,
                teams: [action.payload, ...state.teams],
                loading: false,
            };

        case UPDATE_TEAM:
            return {
                ...state,
                teams: state.teams.map((team) =>
                    team._id === action.payload._id ? action.payload : team
                ),
                loading: false,
            };

        case DELETE_TEAM:
            return {
                ...state,
                teams: state.teams.filter(
                    (team) => team._id !== action.payload
                ),
                loading: false,
            };

        case CLEAR_TEAMS:
            return {
                ...state,
                teams: null,
                filtered: null,
                error: null,
                pcurrent: null,
            };

        case SET_TEAM:
            return {
                ...state,
                pcurrent: action.payload,
            };

        case CLEAR_CURPRO:
            return {
                ...state,
                pcurrent: null,
            };

        case FILTER_TEAM:
            return {
                ...state,
                filtered: state.teams.filter((team) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        team.teamtitle.match(regex) ||
                        team.teamdetails.match(regex) ||
                        team.teamsubt.match(regex)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case TEAM_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};
