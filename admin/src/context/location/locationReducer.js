import {
    ADD_LOCATION,
    UPDATE_LOCATION,
    DELETE_LOCATION,
    SET_LOCATION,
    CLEAR_CURPRO,
    FILTER_LOCATION,
    CLEAR_FILTER,
    LOCATION_ERROR,
    GET_LOCATIONS,
    CLEAR_LOCATIONS,
    GET_LOCATION,
} from '../types';

const fn = (state, action) => {
    switch (action.type) {
        case GET_LOCATIONS:
            return {
                ...state,
                locations: action.payload,
                loading: false,
            };

        case GET_LOCATION:
            return {
                ...state,
                location: action.payload,
                loading: false,
            };

        case ADD_LOCATION:
            return {
                ...state,
                locations: [action.payload, ...state.locations],
                loading: false,
            };

        case UPDATE_LOCATION:
            return {
                ...state,
                locations: state.locations.map((location) =>
                    location._id === action.payload._id
                        ? action.payload
                        : location
                ),
                loading: false,
            };

        case DELETE_LOCATION:
            return {
                ...state,
                locations: state.locations.filter(
                    (location) => location._id !== action.payload
                ),
                loading: false,
            };

        case CLEAR_LOCATIONS:
            return {
                ...state,
                locations: null,
                filtered: null,
                error: null,
                dcurrent: null,
            };

        case SET_LOCATION:
            return {
                ...state,
                dcurrent: action.payload,
            };

        case CLEAR_CURPRO:
            return {
                ...state,
                dcurrent: null,
            };

        case FILTER_LOCATION:
            return {
                ...state,
                filtered: state.locations.filter((location) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        location.locationtitle.match(regex) ||
                        location.locationdetails.match(regex) ||
                        location.locationsubt.match(regex)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case LOCATION_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default fn;
