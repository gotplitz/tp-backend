import React, { useReducer } from 'react';
import axios from 'axios';

import ServiceContext from './serviceContext';
import serviceReducer from './serviceReducer';
import {
    ADD_SERVICE,
    SERVICE_ERROR,
    SET_SERVICE,
    CLEAR_CURREP,
    UPDATE_SERVICE,
    DELETE_SERVICE,
    FILTER_SERVICE,
    CLEAR_FILTER,
    GET_SERVICES,
    CLEAR_SERVICES,
    GET_SERVICE,
} from '../types';

const ServiceState = (props) => {
    const initialState = {
        services: null,
        service: null,
        pcurrent: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(serviceReducer, initialState);

    // Get Services
    const getServices = async () => {
        try {
            const res = await axios.get('/api/services');

            dispatch({ type: GET_SERVICES, payload: res.data });
        } catch (err) {
            dispatch({ type: SERVICE_ERROR, payload: err.response.msg });
        }
    };

    // Get service by link
    const getServiceByLink = async (servicelink) => {
        try {
            const res = await axios.get(`/api/services/${servicelink}`);

            dispatch({
                type: GET_SERVICE,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: SERVICE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Add Service
    const addService = async (newservice) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/services', newservice, config);

            dispatch({ type: ADD_SERVICE, payload: res.data });
        } catch (err) {
            dispatch({ type: SERVICE_ERROR, payload: err.response.msg });
        }
    };

    // Remove Service
    const deleteService = async (id) => {
        try {
            await axios.delete(`/api/services/${id}`);

            dispatch({
                type: DELETE_SERVICE,
                payload: id,
            });
        } catch (err) {
            dispatch({ type: SERVICE_ERROR, payload: err.response.msg });
        }
    };

    // Update Service
    const updateService = async (service) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put(
                `/api/services/update/${service._id}`,
                service,
                config
            );

            dispatch({ type: UPDATE_SERVICE, payload: res.data });
        } catch (err) {
            dispatch({ type: SERVICE_ERROR, payload: err.response.msg });
        }
    };

    // Clear Services
    const clearServices = () => {
        dispatch({ type: CLEAR_SERVICES });
    };

    // Set Pcurrent
    const setPcurrent = (service) => {
        dispatch({ type: SET_SERVICE, payload: service });
    };

    // Clear Pcurrent
    const clearPcurrent = () => {
        dispatch({ type: CLEAR_CURREP });
    };

    // Filter Service
    const filterServices = (text) => {
        dispatch({ type: FILTER_SERVICE, payload: text });
    };

    // Clear Pcurrent
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ServiceContext.Provider
            value={{
                services: state.services,
                service: state.service,
                pcurrent: state.pcurrent,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getServiceByLink,
                getServices,
                addService,
                deleteService,
                setPcurrent,
                clearPcurrent,
                updateService,
                filterServices,
                clearFilter,
                clearServices,
            }}
        >
            {props.children}
        </ServiceContext.Provider>
    );
};

export default ServiceState;
