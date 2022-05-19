import {
    ADD_TESTIMONIAL,
    GET_TESTIMONIALS,
    TESTIMONIAL_ERROR,
    DELETE_TESTIMONIAL,
    UPDATE_TESTIMONIAL,
    CLEAR_TESTIMONIALS,
    SET_TESTIMONIAL,
    CLEAR_CURPIT,
    FILTER_TESTIMONIAL,
    CLEAR_FILTER,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_TESTIMONIALS:
            return {
                ...state,
                testimonials: action.payload,
                loading: false,
            };

        case ADD_TESTIMONIAL:
            return {
                ...state,
                testimonials: [action.payload, ...state.testimonials],
                loading: false,
            };

        case UPDATE_TESTIMONIAL:
            return {
                ...state,
                testimonials: state.testimonials.map((testimonial) =>
                    testimonial._id === action.payload._id
                        ? action.payload
                        : testimonial
                ),
                loading: false,
            };

        case DELETE_TESTIMONIAL:
            return {
                ...state,
                testimonials: state.testimonials.filter(
                    (testimonial) => testimonial._id !== action.payload
                ),
                loading: false,
            };

        case CLEAR_TESTIMONIALS:
            return {
                ...state,
                testimonials: null,
                filtered: null,
                error: null,
                pcurrent: null,
            };

        case SET_TESTIMONIAL:
            return {
                ...state,
                pcurrent: action.payload,
            };

        case CLEAR_CURPIT:
            return {
                ...state,
                pcurrent: null,
            };

        case FILTER_TESTIMONIAL:
            return {
                ...state,
                filtered: state.testimonials.filter((testimonial) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        testimonial.testimonialtitle.match(regex) ||
                        testimonial.testimonialbody.match(regex)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case TESTIMONIAL_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};
