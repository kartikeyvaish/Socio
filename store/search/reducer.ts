// Imports
import * as actionTypes from "./actionTypes";
import { SearchActionProps, SearchInitialStateProps } from "./types";

// Defining the initial state
export const searchInitialState: SearchInitialStateProps = {
  SearchResults: []
};

// Reducers
const searchReducer = (state = searchInitialState, action: SearchActionProps) => {
  switch (action.type) {
    // Add Search Items
    case actionTypes.ADD_SEARCH_ITEMS: {
      let myState = { ...state };
      let filtered_results = [];

      for (let i = 0; i < action.payload.results.length; i++) {
        let findIndex = myState.SearchResults.findIndex(item => item._id === action.payload.results[i]._id);

        if (findIndex === -1) filtered_results.push(action.payload.results[i]);
      }

      myState.SearchResults = [...myState.SearchResults, ...filtered_results];

      return myState
    }

    // Update Search Item
    case actionTypes.UPDATE_SEARCH_ITEM: {
      let myState = { ...state };

      let findIndex = myState.SearchResults.findIndex(item => item._id === action.payload.user_id);

      if (findIndex === -1) return state;

      myState.SearchResults[findIndex] = { ...myState.SearchResults[findIndex], ...action.payload.user };

      return myState;
    }

    // Remove Search Item
    case actionTypes.REMOVE_SEARCH_ITEM: {
      let myState = { ...state };

      let findIndex = myState.SearchResults.findIndex(item => item._id === action.payload.user_id);

      if (findIndex === -1) return myState;

      myState.SearchResults.splice(findIndex, 1);

      return myState;
    }

    // Remove All Search Items
    case actionTypes.CLEAR_SEARCH_ITEMS: {
      let myState = { ...state };

      myState.SearchResults = [];

      return myState;
    }

    // Default
    case "LOGOUT": return searchInitialState;

    // Default
    default:
      return state;
  }
};

export default searchReducer;
