// types and utils imports
import * as actionTypes from "./actionTypes";
import { RequestsActionProps, RequestsInitialStateProps, } from "./types";


// Defining the initial state
const InitialState: RequestsInitialStateProps = {
  requests: []
};

// Reducers

// Reducer for the requests
const requestsReducer = (state = InitialState, action: RequestsActionProps) => {
  switch (action.type) {
    // Set requests
    case actionTypes.SET_REQUESTS: {
      return {
        ...state,
        requests: action.payload.requests
      };
    }

    // Delete request
    case actionTypes.DELETE_REQUEST: {
      return {
        ...state,
        requests: state.requests.filter(request => request._id !== action.payload.request_id)
      };
    }

    // Add request
    case actionTypes.ADD_REQUEST: {
      return {
        ...state,
        requests: [...state.requests, action.payload.request]
      };
    }

    // Incase of Logout
    case actionTypes.LOGOUT: {
      return InitialState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default requestsReducer;
