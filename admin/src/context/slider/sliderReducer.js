import {
    ADD_SLIDER,
    UPDATE_SLIDER,
    DELETE_SLIDER,
    SET_SLIDER,
    CLEAR_CURPRO,
    FILTER_SLIDER,
    CLEAR_FILTER,
    SLIDER_ERROR,
    GET_SLIDERS,
    CLEAR_SLIDERS,
    GET_SLIDER,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_SLIDERS:
            return {
                ...state,
                sliders: action.payload,
                loading: false,
            };

        case GET_SLIDER:
            return {
                ...state,
                slider: action.payload,
                loading: false,
            };

        case ADD_SLIDER:
            return {
                ...state,
                sliders: [action.payload, ...state.sliders],
                loading: false,
            };

        case UPDATE_SLIDER:
            return {
                ...state,
                sliders: state.sliders.map((slider) =>
                    slider._id === action.payload._id ? action.payload : slider
                ),
                loading: false,
            };

        case DELETE_SLIDER:
            return {
                ...state,
                sliders: state.sliders.filter(
                    (slider) => slider._id !== action.payload
                ),
                loading: false,
            };

        case CLEAR_SLIDERS:
            return {
                ...state,
                sliders: null,
                filtered: null,
                error: null,
                scurrent: null,
            };

        case SET_SLIDER:
            return {
                ...state,
                scurrent: action.payload,
            };

        case CLEAR_CURPRO:
            return {
                ...state,
                scurrent: null,
            };

        case FILTER_SLIDER:
            return {
                ...state,
                filtered: state.sliders.filter((slider) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        slider.title.match(regex) ||
                        slider.moredetails.match(regex)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case SLIDER_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};
