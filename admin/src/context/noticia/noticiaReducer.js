import {
    ADD_NOTICIA,
    UPDATE_NOTICIA,
    DELETE_NOTICIA,
    SET_NOTICIA,
    CLEAR_CURPRO,
    FILTER_NOTICIA,
    CLEAR_FILTER,
    NOTICIA_ERROR,
    GET_NOTICIAS,
    CLEAR_NOTICIAS,
    GET_NOTICIA,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_NOTICIAS:
            return {
                ...state,
                noticias: action.payload,
                loading: false,
            };

        case GET_NOTICIA:
            return {
                ...state,
                noticia: action.payload,
                loading: false,
            };

        case ADD_NOTICIA:
            return {
                ...state,
                noticias: [action.payload, ...state.noticias],
                loading: false,
            };

        case UPDATE_NOTICIA:
            return {
                ...state,
                noticias: state.noticias.map((noticia) =>
                    noticia._id === action.payload._id
                        ? action.payload
                        : noticia
                ),
                loading: false,
            };

        case DELETE_NOTICIA:
            return {
                ...state,
                noticias: state.noticias.filter(
                    (noticia) => noticia._id !== action.payload
                ),
                loading: false,
            };

        case CLEAR_NOTICIAS:
            return {
                ...state,
                noticias: null,
                filtered: null,
                error: null,
                ncurrent: null,
            };

        case SET_NOTICIA:
            return {
                ...state,
                ncurrent: action.payload,
            };

        case CLEAR_CURPRO:
            return {
                ...state,
                ncurrent: null,
            };

        case FILTER_NOTICIA:
            return {
                ...state,
                filtered: state.noticias.filter((noticia) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return (
                        noticia.newstitle.match(regex) ||
                        noticia.newscontent.match(regex) ||
                        noticia.newsintro.match(regex)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case NOTICIA_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};
