import {
    ADD_PROMO,
    UPDATE_PROMO,
    DELETE_PROMO,
    SET_PROMO,
    CLEAR_CURPRO,
    FILTER_PROMO,
    CLEAR_FILTER,
    PROMO_ERROR,
    GET_PROMOS,
    CLEAR_PROMOS,
    GET_PROMO,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_PROMOS:
            return {
                ...state,
                promos: action.payload,
                loading: false,
            };

        case GET_PROMO:
            return {
                ...state,
                promo: action.payload,
                loading: false,
            };

        case ADD_PROMO:
            return {
                ...state,
                promos: [action.payload, ...state.promos],
                loading: false,
            };

        case UPDATE_PROMO:
            return {
                ...state,
                promos: state.promos.map((promo) =>
                    promo._id === action.payload._id ? action.payload : promo
                ),
                loading: false,
            };

        case DELETE_PROMO:
            return {
                ...state,
                promos: state.promos.filter(
                    (promo) => promo._id !== action.payload
                ),
                loading: false,
            };

        case CLEAR_PROMOS:
            return {
                ...state,
                promos: null,
                filtered: null,
                error: null,
                pcurrent: null,
            };

        case SET_PROMO:
            return {
                ...state,
                pcurrent: action.payload,
            };

        case CLEAR_CURPRO:
            return {
                ...state,
                pcurrent: null,
            };

        case FILTER_PROMO:
            return {
                ...state,
                filtered: state.promos.filter((promo) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        promo.title.match(regex) ||
                        promo.amount.match(regex) ||
                        promo.expiration.match(regex)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case PROMO_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};
