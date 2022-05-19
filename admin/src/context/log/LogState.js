import React, { useReducer } from 'react';
import axios from 'axios';

import LogContext from './logContext';
import logReducer from './logReducer';
import { SET_HISTORY, GET_HISTORIES, HISTORY_ERROR } from '../types';

const LogState = (props) => {
  const initialState = {
    logs: null,
    error: null,
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  // Get Histories
  const getHistories = async () => {
    try {
      const res = await axios.get('/api/logs');

      dispatch({ type: GET_HISTORIES, payload: res.data });
    } catch (err) {
      dispatch({ type: HISTORY_ERROR, payload: err.response.msg });
    }
  };

  // Add Log
  const setLog = async (log) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/logs', log, config);

      dispatch({ type: SET_HISTORY, payload: res.data });
    } catch (err) {
      dispatch({ type: HISTORY_ERROR, payload: err.response.msg });
    }
  };

  return (
    <LogContext.Provider
      value={{
        logs: state.logs,
        error: state.error,
        setLog,
        getHistories,
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;
