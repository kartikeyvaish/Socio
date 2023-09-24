import { ActionProps } from "../../types/StoreTypes";
import * as actionTypes from "./actionTypes";
import { GlobalActionPayloadProps } from "./types";

const initialState = {
  muted: false,
};

const globalReducer = (
  state = initialState,
  action: ActionProps<GlobalActionPayloadProps>
) => {
  switch (action.type) {
    case actionTypes.MUTE_POST:
      return {
        ...state,
        muted: action.payload.muted,
      };

    case actionTypes.UNMUTE_POST:
      return {
        ...state,
        muted: action.payload.muted,
      };

    default:
      return state;
  }
};

export default globalReducer;
