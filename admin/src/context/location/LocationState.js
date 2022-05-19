import React, { useReducer } from 'react';
import axios from 'axios';

import LocationContext from './locationContext';
import locationReducer from './locationReducer';
import {
    ADD_LOCATION,
    LOCATION_ERROR,
    SET_LOCATION,
    CLEAR_CURPRO,
    UPDATE_LOCATION,
    DELETE_LOCATION,
    FILTER_LOCATION,
    CLEAR_FILTER,
    GET_LOCATIONS,
    CLEAR_LOCATIONS,
    GET_LOCATION,
} from '../types';

const LocationState = (props) => {
    const initialState = {
        locations: null,
        location: null,
        dcurrent: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(locationReducer, initialState);

    // Get Locations
    const getLocations = async () => {
        try {
            const res = await axios.get('/api/locations');

            dispatch({ type: GET_LOCATIONS, payload: res.data });
        } catch (err) {
            dispatch({ type: LOCATION_ERROR, payload: err.response.msg });
        }
    };

    // Get location by link
    const getLocationByLink = async (locationlink) => {
        try {
            const res = await axios.get(`/api/locations/${locationlink}`);

            dispatch({
                type: GET_LOCATION,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: LOCATION_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Add Location
    const addLocation = async (newlocation) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/locations', newlocation, config);

            dispatch({ type: ADD_LOCATION, payload: res.data });
        } catch (err) {
            dispatch({ type: LOCATION_ERROR, payload: err.response.msg });
        }
    };

    // Remove Location
    const deleteLocation = async (id) => {
        try {
            await axios.delete(`/api/locations/${id}`);

            dispatch({
                type: DELETE_LOCATION,
                payload: id,
            });
        } catch (err) {
            dispatch({ type: LOCATION_ERROR, payload: err.response.msg });
        }
    };

    // Update Location
    const updateLocation = async (location) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put(
                `/api/locations/update/${location._id}`,
                location,
                config
            );

            dispatch({ type: UPDATE_LOCATION, payload: res.data });
        } catch (err) {
            dispatch({ type: LOCATION_ERROR, payload: err.response.msg });
        }
    };

    // Clear Locations
    const clearLocations = () => {
        dispatch({ type: CLEAR_LOCATIONS });
    };

    // Set Pcurrent
    const setPcurrent = (location) => {
        dispatch({ type: SET_LOCATION, payload: location });
    };

    // Clear Pcurrent
    const clearPcurrent = () => {
        dispatch({ type: CLEAR_CURPRO });
    };

    // Filter Location
    const filterLocations = (text) => {
        dispatch({ type: FILTER_LOCATION, payload: text });
    };

    // Clear Pcurrent
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <LocationContext.Provider
            value={{
                locations: state.locations,
                location: state.location,
                dcurrent: state.dcurrent,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getLocationByLink,
                getLocations,
                addLocation,
                deleteLocation,
                setPcurrent,
                clearPcurrent,
                updateLocation,
                filterLocations,
                clearFilter,
                clearLocations,
            }}
        >
            {props.children}
        </LocationContext.Provider>
    );
};

export default LocationState;
