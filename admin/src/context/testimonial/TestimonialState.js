import React, { useReducer } from 'react';
import axios from 'axios';

import TestimonialContext from './testimonialContext';
import testimonialReducer from './testimonialReducer';
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

const TestimonialState = (props) => {
    const initialState = {
        testimonials: null,
        pcurrent: null,
        filtered: null,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(testimonialReducer, initialState);

    // Get Testimonials
    const getTestimonials = async () => {
        try {
            const res = await axios.get('/api/testimonials');

            dispatch({ type: GET_TESTIMONIALS, payload: res.data });
        } catch (err) {
            dispatch({ type: TESTIMONIAL_ERROR, payload: err.response.msg });
        }
    };

    // Add Testimonial
    const addTestimonial = async (newtestimonial) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post(
                '/api/testimonials',
                newtestimonial,
                config
            );

            dispatch({ type: ADD_TESTIMONIAL, payload: res.data });
        } catch (err) {
            dispatch({ type: TESTIMONIAL_ERROR, payload: err.response.msg });
        }
    };

    // Remove Testimonial
    const deleteTestimonial = async (id) => {
        try {
            await axios.delete(`/api/testimonials/${id}`);

            dispatch({
                type: DELETE_TESTIMONIAL,
                payload: id,
            });
        } catch (err) {
            dispatch({ type: TESTIMONIAL_ERROR, payload: err.response.msg });
        }
    };

    // Update Testimonial
    const updateTestimonial = async (testimonial) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put(
                `/api/testimonials/update/${testimonial._id}`,
                testimonial,
                config
            );

            dispatch({ type: UPDATE_TESTIMONIAL, payload: res.data });
        } catch (err) {
            dispatch({ type: TESTIMONIAL_ERROR, payload: err.response.msg });
        }
    };

    // Clear Testimonials
    const clearTestimonials = () => {
        dispatch({ type: CLEAR_TESTIMONIALS });
    };

    // Set Pcurrent
    const setPcurrent = (testimonial) => {
        dispatch({ type: SET_TESTIMONIAL, payload: testimonial });
    };

    // Clear Pcurrent
    const clearPcurrent = () => {
        dispatch({ type: CLEAR_CURPIT });
    };

    // Filter Testimonial
    const filterTestimonials = (text) => {
        dispatch({ type: FILTER_TESTIMONIAL, payload: text });
    };

    // Clear Pcurrent
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <TestimonialContext.Provider
            value={{
                testimonials: state.testimonials,
                pcurrent: state.pcurrent,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getTestimonials,
                addTestimonial,
                deleteTestimonial,
                setPcurrent,
                clearPcurrent,
                updateTestimonial,
                filterTestimonials,
                clearFilter,
                clearTestimonials,
            }}
        >
            {props.children}
        </TestimonialContext.Provider>
    );
};

export default TestimonialState;
