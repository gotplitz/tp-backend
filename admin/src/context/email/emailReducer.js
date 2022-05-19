import {
    DELETE_EMAIL,
    FILTER_EMAIL,
    CLEAR_FILTER,
    EMAIL_ERROR,
    GET_EMAILS,
    CLEAR_EMAILS,
    GET_EMAIL,
} from '../types';

const fn = (state, action) => {
    switch (action.type) {
        case GET_EMAILS:
            return {
                ...state,
                emails: action.payload,
                loading: false,
            };

        case GET_EMAIL:
            return {
                ...state,
                email: action.payload,
                loading: false,
            };

        case DELETE_EMAIL:
            return {
                ...state,
                emails: state.emails.filter(
                    (email) => email._id !== action.payload
                ),
                loading: false,
            };

        case CLEAR_EMAILS:
            return {
                ...state,
                emails: null,
                filtered: null,
                error: null,
            };

        case FILTER_EMAIL:
            return {
                ...state,
                filtered: state.emails.filter((email) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        email.address.match(regex) ||
                        email.clientemail.match(regex) ||
                        email.fullname.match(regex) ||
                        email.phone.match(regex)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case EMAIL_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default fn;
