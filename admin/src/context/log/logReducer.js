import { SET_HISTORY, HISTORY_ERROR, GET_HISTORIES } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_HISTORIES:
      return {
        ...state,
        logs: action.payload,
      };

    case SET_HISTORY:
      return { ...state, log: action.payload };

    case HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
