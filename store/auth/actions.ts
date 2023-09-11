// Local imports
import { UserProps } from "../../types/AppTypes";
import * as actionTypes from "./actionTypes";

// Action Creator to set the user
function setUser(user: UserProps) {
    return {
        type: actionTypes.SET_USER,
        payload: { user }
    };
}

// Action Creator to logout the user
function logoutUser() {
    return {
        type: actionTypes.LOGOUT
    };
}

// Action Creator to update the user
function updateUser(user: UserProps) {
    return {
        type: actionTypes.UPDATE_USER,
        payload: { user }
    };
}

const authActions = {
    setUser,
    logoutUser,
    updateUser
};

export default authActions;