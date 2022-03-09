// Types and Actions Imports
import { EachStoryItemProps, ProfileStoriesProps, StoriesActionProps, StoryItemProps } from "./types";
import * as actionTypes from "./actionTypes";

// Stories Action Creators 

// function to set stories
const SetStories = (stories: Array<StoryItemProps>): StoriesActionProps => {
    return {
        type: actionTypes.SET_STORIES,
        payload: { stories }
    }
}

// function to set profile stories
const SetProfileStories = (profile_stories: ProfileStoriesProps): StoriesActionProps => {
    return {
        type: actionTypes.SET_PROFILE_STORIES,
        payload: { profile_stories }
    }
}

// function to add a story to profile stories
const AddProfileStories = (profile_story: EachStoryItemProps): StoriesActionProps => {
    return {
        type: actionTypes.ADD_PROFILE_STORIES,
        payload: { profile_story }
    }
}

// function to remove a story from profile stories
const RemoveProfileStories = (profile_story_id: string): StoriesActionProps => {
    return {
        type: actionTypes.REMOVE_PROFILE_STORIES,
        payload: { profile_story_id }
    }
}

// function to mark a story as viewed
const MarkStoryAsViewed = (story_owner_id: string, story_id: string): StoriesActionProps => {
    return {
        type: actionTypes.MARK_STORY_AS_VIEWED,
        payload: { story_id, story_owner_id }
    }
}

// function to mark a profile story as viewed
const MarkProfileStoryAsViewed = (): StoriesActionProps => {
    return {
        type: actionTypes.MARK_PROFILE_STORY_AS_VIEWED,
    }
}

// Assemble Stories Actions
const StoriesActions = {
    SetStories,
    SetProfileStories,
    AddProfileStories,
    RemoveProfileStories,
    MarkStoryAsViewed,
    MarkProfileStoryAsViewed
};

// Exports
export default StoriesActions;