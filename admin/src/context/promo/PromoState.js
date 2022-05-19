import React, { useReducer } from 'react';
import axios from 'axios';

import PromoContext from './promoContext';
import promoReducer from './promoReducer';
import {
    ADD_PROMO,
    PROMO_ERROR,
    SET_PROMO,
    UPDATE_PROMO,
    DELETE_PROMO,
    FILTER_PROMO,
    CLEAR_FILTER,
    GET_PROMOS,
    CLEAR_PROMOS,
    GET_PROMO,
    CLEAR_CURRENT,
} from '../types';

const PromoState = (props) => {
    const initialState = {
        promos: null,
        promo: null,
        pcurrent: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(promoReducer, initialState);

    // Get Promos
    const getPromos = async () => {
        try {
            const res = await axios.get('/api/promos');

            dispatch({ type: GET_PROMOS, payload: res.data });
        } catch (err) {
            dispatch({ type: PROMO_ERROR, payload: err.response.msg });
        }
    };

    // Add Promo
    const addPromo = async (newpromo) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/promos', newpromo, config);

            dispatch({ type: ADD_PROMO, payload: res.data });
        } catch (err) {
            dispatch({ type: PROMO_ERROR, payload: err.response.msg });
        }
    };

    // Get promo by link
    const getPromoByLink = async (newslink) => {
        try {
            const res = await axios.get(`/api/promos/${newslink}`);

            dispatch({
                type: GET_PROMO,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: PROMO_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Remove Promo
    const deletePromo = async (id) => {
        try {
            await axios.delete(`/api/promos/${id}`);

            dispatch({
                type: DELETE_PROMO,
                payload: id,
            });
        } catch (err) {
            dispatch({ type: PROMO_ERROR, payload: err.response.msg });
        }
    };

    // Update Promo
    const updatePromo = async (promo) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put(
                `/api/promos/update/${promo._id}`,
                promo,
                config
            );

            dispatch({ type: UPDATE_PROMO, payload: res.data });
        } catch (err) {
            dispatch({ type: PROMO_ERROR, payload: err.response.msg });
        }
    };

    // Clear Promos
    const clearPromos = () => {
        dispatch({ type: CLEAR_PROMOS });
    };

    // Set Pcurrent
    const setCurrent = (promo) => {
        dispatch({ type: SET_PROMO, payload: promo });
    };

    // Clear Pcurrent
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Promo
    const filterPromos = (text) => {
        dispatch({ type: FILTER_PROMO, payload: text });
    };

    // Clear Pcurrent
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <PromoContext.Provider
            value={{
                promos: state.promos,
                promo: state.promo,
                pcurrent: state.pcurrent,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getPromoByLink,
                getPromos,
                addPromo,
                deletePromo,
                setCurrent,
                clearCurrent,
                updatePromo,
                filterPromos,
                clearFilter,
                clearPromos,
            }}
        >
            {props.children}
        </PromoContext.Provider>
    );
};

export default PromoState;
