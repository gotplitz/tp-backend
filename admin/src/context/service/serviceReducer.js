import {
    ADD_SERVICE,
    UPDATE_SERVICE,
    DELETE_SERVICE,
    SET_SERVICE,
    CLEAR_CURREP,
    FILTER_SERVICE,
    CLEAR_FILTER,
    SERVICE_ERROR,
    GET_SERVICES,
    CLEAR_SERVICES,
    GET_SERVICE,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_SERVICES:
            return {
                ...state,
                services: action.payload,
                loading: false,
            };

        case GET_SERVICE:
            return {
                ...state,
                service: action.payload,
                loading: false,
            };

        case ADD_SERVICE:
            return {
                ...state,
                services: [action.payload, ...state.services],
                loading: false,
            };

        case UPDATE_SERVICE:
            return {
                ...state,
                services: state.services.map((service) =>
                    service._id === action.payload._id
                        ? action.payload
                        : service
                ),
                loading: false,
            };

        case DELETE_SERVICE:
            return {
                ...state,
                services: state.services.filter(
                    (service) => service._id !== action.payload
                ),
                loading: false,
            };

        case CLEAR_SERVICES:
            return {
                ...state,
                services: null,
                filtered: null,
                error: null,
                pcurrent: null,
            };

        case SET_SERVICE:
            return {
                ...state,
                pcurrent: action.payload,
            };

        case CLEAR_CURREP:
            return {
                ...state,
                pcurrent: null,
            };

        case FILTER_SERVICE:
            return {
                ...state,
                filtered: state.services.filter((service) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        service.servicetitle.match(regex) ||
                        service.servicedetails.match(regex)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case SERVICE_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};
