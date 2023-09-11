// Local imports
import * as actionTypes from "./actionTypes"
import { ActionProps } from "../../types/StoreTypes";
import { AuthActionPayloadProps } from "./types";
import { UserProps } from "../../types/AppTypes";

const initialState: UserProps | null = null

const authReducer = (state = initialState, action: ActionProps<AuthActionPayloadProps>) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return action.payload.user

        case actionTypes.LOGOUT:
            return null

        case actionTypes.UPDATE_USER: {
            const { user } = action.payload

            if (state)
                return { ...state, ...user }

            return state
        }

        default:
            return state
    }
}

export default authReducer