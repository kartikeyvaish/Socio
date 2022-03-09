// Imports
import * as actionTypes from "./actionTypes";
import { CommentsActionProps, CommentsInitialStateProps } from "./types";

// Defining the initial state
export const commentsInitialState: CommentsInitialStateProps = {
  Comment: "",
  Comments: [],
  Loading: true,
  Refreshing: false,
};

// Reducers
const commentsReducer = (state = commentsInitialState, action: CommentsActionProps) => {
  switch (action.type) {
    case actionTypes.SET_COMMENT:
      return { ...state, Comment: action.payload.comment };

    case actionTypes.SET_COMMENTS:
      return { ...state, Comments: action.payload.comments };

    case actionTypes.ADD_COMMENT: {
      let myState = { ...state };

      // if there is an comment which has the same id, then dont add it
      let found = myState.Comments.findIndex(comment => comment._id === action.payload.new_comment._id);
      if (found >= 0) return state;

      myState.Comments = [action.payload.new_comment, ...myState.Comments];
      myState.Comment = "";

      return myState;
    }

    case actionTypes.ADD_COMMENT_AT_INDEX: {
      let myState = { ...state };

      // if there is an comment which has the same id, then dont add it
      let found = myState.Comments.findIndex(comment => comment._id === action.payload.new_comment._id);
      if (found >= 0) return state;

      myState.Comments.splice(action.payload.index, 0, action.payload.new_comment);
      myState.Comment = "";

      return myState;
    }

    case actionTypes.DELETE_COMMENT: {
      let myState = { ...state };

      // findIndex returns -1 if the comment is not found
      let found = myState.Comments.findIndex(comment => comment._id === action.payload.comment_id);
      if (found === -1) return state;

      // if the comment is found, then remove it
      myState.Comments.splice(found, 1);

      return myState;
    }

    case actionTypes.SET_LOADING:
      return { ...state, Loading: action.payload.loading, };

    case actionTypes.SET_REFRESHING:
      return { ...state, Refreshing: action.payload.refreshing };

    case actionTypes.UPDATE_COMMENT: {
      let myState = { ...state };

      // findIndex returns -1 if the comment is not found
      let found = myState.Comments.findIndex(comment => comment._id === action.payload.comment_id);
      if (found === -1) return state;

      // if the comment is found, then update it 
      myState.Comments[found]._id = action.payload.new_comment._id;
      myState.Comments[found].disabled = false;

      return myState;
    }

    // Default
    default:
      return state;
  }
};

export default commentsReducer;
