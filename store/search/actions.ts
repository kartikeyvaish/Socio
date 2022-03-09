// Types and Actions Imports
import * as actionTypes from "./actionTypes";
import { SearchActionProps } from "./types";
import { UserProps } from "../auth/types";

// Search Action Creators 

// function to add search items
function AddSearchItems(results: Array<UserProps>): SearchActionProps {
    return {
        type: actionTypes.ADD_SEARCH_ITEMS,
        payload: { results }
    }
}

// function to update search item
function UpdateSearchItem(user: UserProps, user_id: string): SearchActionProps {
    return {
        type: actionTypes.UPDATE_SEARCH_ITEM,
        payload: { user, user_id }
    }
}

// function to remove search item
function RemoveSearchItem(user_id: string): SearchActionProps {
    return {
        type: actionTypes.REMOVE_SEARCH_ITEM,
        payload: { user_id }
    }
}

// function to clear all search items
function ClearSearchItems(): SearchActionProps {
    return {
        type: actionTypes.CLEAR_SEARCH_ITEMS
    }
}

// Assemble Search Actions
const SearchActions = {
    AddSearchItems,
    UpdateSearchItem,
    RemoveSearchItem,
    ClearSearchItems
};

// Exports
export default SearchActions;