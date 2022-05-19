import React, { useReducer } from 'react';
import axios from 'axios';

import NoticiaContext from './noticiaContext';
import noticiaReducer from './noticiaReducer';
import {
    ADD_NOTICIA,
    NOTICIA_ERROR,
    SET_NOTICIA,
    UPDATE_NOTICIA,
    DELETE_NOTICIA,
    FILTER_NOTICIA,
    CLEAR_FILTER,
    GET_NOTICIAS,
    CLEAR_NOTICIAS,
    GET_NOTICIA,
    CLEAR_CURNO,
} from '../types';

const NoticiaState = (props) => {
    const initialState = {
        noticias: null,
        noticia: null,
        ncurrent: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(noticiaReducer, initialState);

    // Get Noticias
    const getNoticias = async () => {
        try {
            const res = await axios.get('/api/noticias');

            dispatch({ type: GET_NOTICIAS, payload: res.data });
        } catch (err) {
            dispatch({ type: NOTICIA_ERROR, payload: err.response.msg });
        }
    };

    // Add Noticia
    const addNoticia = async (newnoticia) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/noticias', newnoticia, config);

            dispatch({ type: ADD_NOTICIA, payload: res.data });
        } catch (err) {
            dispatch({ type: NOTICIA_ERROR, payload: err.response.msg });
        }
    };

    // Get noticia by link
    const getNoticiaByLink = async (newslink) => {
        try {
            const res = await axios.get(`/api/noticias/${newslink}`);

            dispatch({
                type: GET_NOTICIA,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: NOTICIA_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Remove Noticia
    const deleteNoticia = async (id) => {
        try {
            await axios.delete(`/api/noticias/${id}`);

            dispatch({
                type: DELETE_NOTICIA,
                payload: id,
            });
        } catch (err) {
            dispatch({ type: NOTICIA_ERROR, payload: err.response.msg });
        }
    };

    // Update Noticia
    const updateNoticia = async (noticia) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put(
                `/api/noticias/update/${noticia._id}`,
                noticia,
                config
            );

            dispatch({ type: UPDATE_NOTICIA, payload: res.data });
        } catch (err) {
            dispatch({ type: NOTICIA_ERROR, payload: err.response.msg });
        }
    };

    // Clear Noticias
    const clearNoticias = () => {
        dispatch({ type: CLEAR_NOTICIAS });
    };

    // Set Pcurrent
    const setNcurrent = (noticia) => {
        dispatch({ type: SET_NOTICIA, payload: noticia });
    };

    // Clear Pcurrent
    const clearNcurrent = () => {
        dispatch({ type: CLEAR_CURNO });
    };

    // Filter Noticia
    const filterNoticias = (text) => {
        dispatch({ type: FILTER_NOTICIA, payload: text });
    };

    // Clear Pcurrent
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <NoticiaContext.Provider
            value={{
                noticias: state.noticias,
                noticia: state.noticia,
                ncurrent: state.ncurrent,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getNoticiaByLink,
                getNoticias,
                addNoticia,
                deleteNoticia,
                setNcurrent,
                clearNcurrent,
                updateNoticia,
                filterNoticias,
                clearFilter,
                clearNoticias,
            }}
        >
            {props.children}
        </NoticiaContext.Provider>
    );
};

export default NoticiaState;
