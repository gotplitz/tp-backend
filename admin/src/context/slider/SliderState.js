import React, { useReducer } from 'react';
import axios from 'axios';

import SliderContext from './sliderContext';
import sliderReducer from './sliderReducer';
import {
    ADD_SLIDER,
    SLIDER_ERROR,
    SET_SLIDER,
    UPDATE_SLIDER,
    DELETE_SLIDER,
    FILTER_SLIDER,
    CLEAR_FILTER,
    GET_SLIDERS,
    CLEAR_SLIDERS,
    GET_SLIDER,
    CLEAR_CURRENT,
} from '../types';

const SliderState = (props) => {
    const initialState = {
        sliders: null,
        slider: null,
        scurrent: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(sliderReducer, initialState);

    // Get Sliders
    const getSliders = async () => {
        try {
            const res = await axios.get('/api/sliders');

            dispatch({ type: GET_SLIDERS, payload: res.data });
        } catch (err) {
            dispatch({ type: SLIDER_ERROR, payload: err.response.msg });
        }
    };

    // Add Slider
    const addSlider = async (newslider) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            await axios
                .post('/api/sliders', newslider, config)
                .then((res) => {
                    dispatch({ type: ADD_SLIDER, payload: res.data });
                })
                .catch((err) =>
                    dispatch({ type: SLIDER_ERROR, payload: err.response.data })
                );
        } catch (err) {
            dispatch({ type: SLIDER_ERROR, payload: err.response.msg });
        }
    };

    // Get slider by link
    const getSliderByLink = async (newslink) => {
        try {
            const res = await axios.get(`/api/sliders/${newslink}`);

            dispatch({
                type: GET_SLIDER,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: SLIDER_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Remove Slider
    const deleteSlider = async (id) => {
        try {
            await axios.delete(`/api/sliders/${id}`);

            dispatch({
                type: DELETE_SLIDER,
                payload: id,
            });
        } catch (err) {
            dispatch({ type: SLIDER_ERROR, payload: err.response.msg });
        }
    };

    // Update Slider
    const updateSlider = async (slider) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put(
                `/api/sliders/update/${slider._id}`,
                slider,
                config
            );

            dispatch({ type: UPDATE_SLIDER, payload: res.data });
        } catch (err) {
            dispatch({ type: SLIDER_ERROR, payload: err.response.msg });
        }
    };

    // Clear Sliders
    const clearSliders = () => {
        dispatch({ type: CLEAR_SLIDERS });
    };

    // Set Pcurrent
    const setCurrent = (slider) => {
        dispatch({ type: SET_SLIDER, payload: slider });
    };

    // Clear Pcurrent
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Slider
    const filterSliders = (text) => {
        dispatch({ type: FILTER_SLIDER, payload: text });
    };

    // Clear Pcurrent
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <SliderContext.Provider
            value={{
                sliders: state.sliders,
                slider: state.slider,
                scurrent: state.scurrent,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getSliderByLink,
                getSliders,
                addSlider,
                deleteSlider,
                setCurrent,
                clearCurrent,
                updateSlider,
                filterSliders,
                clearFilter,
                clearSliders,
            }}
        >
            {props.children}
        </SliderContext.Provider>
    );
};

export default SliderState;
