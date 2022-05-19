import React, { useReducer } from 'react';
import axios from 'axios';

import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
} from '../types';

const ProfileState = (props) => {
    const initialState = {
        profile: null,
        profiles: [],
        loading: true,
        error: {},
    };

    const [state, dispatch] = useReducer(profileReducer, initialState);

    // Get current profile
    const getCurrentProfile = async () => {
        try {
            const res = await axios.get('/api/profile/me');

            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Get All profiles
    const getProfiles = async () => {
        dispatch({ type: CLEAR_PROFILE });

        try {
            const res = await axios.get('/api/profile');

            dispatch({
                payload: res.data,
                type: GET_PROFILES,
            });
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    const getProfileById = async (userId) => {
        try {
            const res = await axios.get(`/api/profile/user/${userId}`);

            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Create or update profile
    const createProfile = async (formData, history, edit = false) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.post('/api/profile', formData, config);

            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });

            if (!edit) {
                history.push(`/all-profiles`);
            }
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    // Delete account and profile
    const deleteAccount = async () => {
        if (window.confirm(`Are you sure? This can't be undone`)) {
            try {
                await axios.delete(`/api/profile`);

                dispatch({
                    type: CLEAR_PROFILE,
                });
                dispatch({
                    type: ACCOUNT_DELETED,
                });

                dispatch('Your account has been removed', 'error');
            } catch (err) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {
                        msg: err.response.statusText,
                        status: err.response.status,
                    },
                });
            }
        }
    };

    // Add personal service
    const addPersonalService = async (formData, history) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.put(
                '/api/profile/portfolio',
                formData,
                config
            );

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data,
            });

            history.push('/personal-portfolios');
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    const deletePortfolio = async (id) => {
        try {
            const res = await axios.delete(`/api/profile/portfolio/${id}`);

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

    return (
        <ProfileContext.Provider
            value={{
                profile: state.profile,
                profiles: state.profiles,
                loading: state.loading,
                error: state.error,
                getProfileById,
                getCurrentProfile,
                createProfile,
                getProfiles,
                deleteAccount,
                addPersonalService,
                deletePortfolio,
            }}
        >
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileState;
