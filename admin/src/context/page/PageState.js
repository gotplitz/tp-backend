import React, { useReducer } from 'react';
import axios from 'axios';

import PageContext from './pageContext';
import pageReducer from './pageReducer';
import {
    ADD_PAGE,
    PAGE_ERROR,
    SET_PAGE,
    CLEAR_CURPAGE,
    UPDATE_PAGE,
    DELETE_PAGE,
    FILTER_PAGE,
    CLEAR_FILTER,
    GET_PAGES,
    CLEAR_PAGES,
    GET_PAGE,
} from '../types';

const PageState = (props) => {
    const initialState = {
        pages: null,
        page: null,
        pcurrent: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(pageReducer, initialState);

    // Get Pages
    const getPages = async () => {
        try {
            const res = await axios.get('/api/pages');

            dispatch({ type: GET_PAGES, payload: res.data });
        } catch (err) {
            dispatch({ type: PAGE_ERROR, payload: err.response.msg });
        }
    };

    // Get page by link
    const getPageByLink = async (pagelink) => {
        try {
            const res = await axios.get(`/api/pages/${pagelink}`);

            dispatch({
                type: GET_PAGE,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: PAGE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Add Page
    const addPage = async (newpage) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/pages', newpage, config);

            dispatch({ type: ADD_PAGE, payload: res.data });
        } catch (err) {
            dispatch({ type: PAGE_ERROR, payload: err.response.msg });
        }
    };

    // Remove Page
    const deletePage = async (id) => {
        try {
            await axios.delete(`/api/pages/${id}`);

            dispatch({
                type: DELETE_PAGE,
                payload: id,
            });
        } catch (err) {
            dispatch({ type: PAGE_ERROR, payload: err.response.msg });
        }
    };

    // Update Page
    const updatePage = async (page) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put(
                `/api/pages/update/${page._id}`,
                page,
                config
            );

            dispatch({ type: UPDATE_PAGE, payload: res.data });
        } catch (err) {
            dispatch({ type: PAGE_ERROR, payload: err.response.msg });
        }
    };

    // Clear Pages
    const clearPages = () => {
        dispatch({ type: CLEAR_PAGES });
    };

    // Set Pcurrent
    const setPcurrent = (page) => {
        dispatch({ type: SET_PAGE, payload: page });
    };

    // Clear Pcurrent
    const clearPcurrent = () => {
        dispatch({ type: CLEAR_CURPAGE });
    };

    // Filter Page
    const filterPages = (text) => {
        dispatch({ type: FILTER_PAGE, payload: text });
    };

    // Clear Pcurrent
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <PageContext.Provider
            value={{
                pages: state.pages,
                page: state.page,
                pcurrent: state.pcurrent,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getPageByLink,
                getPages,
                addPage,
                deletePage,
                setPcurrent,
                clearPcurrent,
                updatePage,
                filterPages,
                clearFilter,
                clearPages,
            }}
        >
            {props.children}
        </PageContext.Provider>
    );
};

export default PageState;
