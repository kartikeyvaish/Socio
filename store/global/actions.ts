import * as actionTypes from "./actionTypes";
import { ActionProps } from "../../types/StoreTypes";
import { GlobalActionPayloadProps } from "./types";

// Action Creators to mute the audio
function muteAudio(): ActionProps<GlobalActionPayloadProps> {
  return {
    type: actionTypes.MUTE_POST,
    payload: { muted: true },
  };
}

// Action Creators to unmute the audio
function unmuteAudio(): ActionProps<GlobalActionPayloadProps> {
  return {
    type: actionTypes.UNMUTE_POST,
    payload: { muted: false },
  };
}

const globalActions = { muteAudio, unmuteAudio };

export default globalActions;
