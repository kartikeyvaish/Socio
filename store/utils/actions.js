// Imports
import * as actionTypes from "./actionTypes";

// Global Store Action Creators

// Set Overlay visibility action creator
export const SetOverlay = (config = {}) => ({
  type: actionTypes.SET_OVERLAY,
  payload: {
    ...config,
  },
});
