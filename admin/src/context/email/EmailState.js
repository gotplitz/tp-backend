import React, { useReducer } from 'react';
import axios from 'axios';

import EmailContext from './emailContext';
import emailReducer from './emailReducer';
import {
    EMAIL_ERROR,
    DELETE_EMAIL,
    FILTER_EMAIL,
    CLEAR_FILTER,
    GET_EMAILS,
    CLEAR_EMAILS,
    GET_EMAIL,
} from '../types';

const EmailState = (props) => {
    const initialState = {
        emails: null,
        email: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(emailReducer, initialState);

    // Get Emails
    const getEmails = async () => {
        try {
            const res = await axios.get('/api/emails');

            dispatch({ type: GET_EMAILS, payload: res.data });
        } catch (err) {
            dispatch({ type: EMAIL_ERROR, payload: err.response.msg });
        }
    };

    // Get email by link
    const getEmailByLink = async (emaillink) => {
        try {
            const res = await axios.get(`/api/emails/${emaillink}`);

            dispatch({
                type: GET_EMAIL,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: EMAIL_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Remove Email
    const deleteEmail = async (id) => {
        try {
            await axios.delete(`/api/emails/${id}`);

            dispatch({
                type: DELETE_EMAIL,
                payload: id,
            });
        } catch (err) {
            dispatch({ type: EMAIL_ERROR, payload: err.response.msg });
        }
    };

    // Clear Emails
    const clearEmails = () => {
        dispatch({ type: CLEAR_EMAILS });
    };

    // Filter Email
    const filterEmails = (text) => {
        dispatch({ type: FILTER_EMAIL, payload: text });
    };

    // Clear Pcurrent
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <EmailContext.Provider
            value={{
                emails: state.emails,
                email: state.email,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getEmailByLink,
                getEmails,
                deleteEmail,
                filterEmails,
                clearFilter,
                clearEmails,
            }}
        >
            {props.children}
        </EmailContext.Provider>
    );
};

export default EmailState;
