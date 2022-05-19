import {
    ADD_PAGE,
    UPDATE_PAGE,
    DELETE_PAGE,
    SET_PAGE,
    CLEAR_CURPAGE,
    FILTER_PAGE,
    CLEAR_FILTER,
    PAGE_ERROR,
    GET_PAGES,
    CLEAR_PAGES,
    GET_PAGE,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_PAGES:
            return {
                ...state,
                pages: action.payload,
                loading: false,
            };

        case GET_PAGE:
            return {
                ...state,
                page: action.payload,
                loading: false,
            };

        case ADD_PAGE:
            return {
                ...state,
                pages: [action.payload, ...state.pages],
                loading: false,
            };

        case UPDATE_PAGE:
            return {
                ...state,
                pages: state.pages.map((page) =>
                    page._id === action.payload._id ? action.payload : page
                ),
                loading: false,
            };

        case DELETE_PAGE:
            return {
                ...state,
                pages: state.pages.filter(
                    (page) => page._id !== action.payload
                ),
                loading: false,
            };

        case CLEAR_PAGES:
            return {
                ...state,
                pages: null,
                filtered: null,
                error: null,
                pcurrent: null,
            };

        case SET_PAGE:
            return {
                ...state,
                pcurrent: action.payload,
            };

        case CLEAR_CURPAGE:
            return {
                ...state,
                pcurrent: null,
            };

        case FILTER_PAGE:
            return {
                ...state,
                filtered: state.pages.filter((page) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        page.pagetitle.match(regex) ||
                        page.pagedetails.match(regex)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case PAGE_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};
