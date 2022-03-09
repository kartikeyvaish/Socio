// Imports
import * as actionTypes from "./actionTypes";
import { StoriesActionProps, StoriesInitialStateProps } from "./types";

// Defining the initial state
export const storiesInitialState: StoriesInitialStateProps = {
  FeedStories: [],
  ProfileStories: {
    stories: [],
    viewed_by_you: false,
  }
};

// Reducers
const storiesReducer = (state = storiesInitialState, action: StoriesActionProps) => {
  switch (action.type) {

    // Set Stories
    case actionTypes.SET_STORIES: {
      const myState = { ...state };

      // Set the stories
      myState.FeedStories = action.payload.stories;

      return myState;
    }

    // Set Profile Stories
    case actionTypes.SET_PROFILE_STORIES: {
      const myState = { ...state };

      // Set the stories
      myState.ProfileStories = action.payload.profile_stories;

      return myState;
    }

    // Add Profile Stories
    case actionTypes.ADD_PROFILE_STORIES: {
      const myState = { ...state };

      // Check if the stories are already exists
      const findIndex = myState.ProfileStories.stories.findIndex(
        (story) => story._id === action.payload.profile_story._id
      );

      // If the stories are not exists, add the story at the end
      if (findIndex === -1) {
        myState.ProfileStories.stories.push(action.payload.profile_story);

        myState.ProfileStories.viewed_by_you = false;
      }

      return myState;
    }

    // Remove Profile Stories
    case actionTypes.REMOVE_PROFILE_STORIES: {
      const myState = { ...state };

      // Check if the stories are already exists
      const findIndex = myState.ProfileStories.stories.findIndex(
        (story) => story._id === action.payload.profile_story_id
      );

      // If the stories are exists, remove the story
      if (findIndex !== -1) {
        myState.ProfileStories.stories.splice(findIndex, 1);
      }

      return myState;
    }

    // mark a story as viewed
    case actionTypes.MARK_STORY_AS_VIEWED: {
      const myState = { ...state };

      // Check if the stories are already exists
      const findIndex = myState.FeedStories.findIndex(
        (story) => story._id === action.payload.story_owner_id
      );

      // If the stories are exists, mark the story as viewed
      if (findIndex !== -1) {
        const findStory = myState.FeedStories[findIndex].stories.findIndex(
          (story) => story._id === action.payload.story_id
        )

        if (findStory !== -1)
          myState.FeedStories[findIndex].stories[findStory].viewed_by_you = true;

        // If all the items are viewed, mark the stories as viewed
        if (myState.FeedStories[findIndex].stories.every(story => story.viewed_by_you))
          myState.FeedStories[findIndex].viewed_by_you = true;
      }

      return myState;
    }

    // mark a profile story as viewed
    case actionTypes.MARK_PROFILE_STORY_AS_VIEWED: {
      const myState = { ...state };

      myState.ProfileStories.viewed_by_you = true;

      return myState;
    }

    // Default
    case "LOGOUT": return storiesInitialState;

    // Default
    default:
      return state;
  }
};

export default storiesReducer;
