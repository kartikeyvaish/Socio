// Imports
import * as actionTypes from "./actionTypes";
import { RequestProps, RequestsActionProps } from "./types";

// Action Creators for the requests

// Action Creators: Change requests state variable
function SetRequests(requests: Array<RequestProps>): RequestsActionProps {
  return {
    type: actionTypes.SET_REQUESTS,
    payload: { requests }
  }
}

// Action Creators: Delete a request
function DeleteRequest(request_id: string): RequestsActionProps {
  return {
    type: actionTypes.DELETE_REQUEST,
    payload: { request_id }
  }
}

// function to add request 
function AddRequest(request: RequestProps): RequestsActionProps {
  return {
    type: actionTypes.ADD_REQUEST,
    payload: { request }
  }
}

// Assemble RequestsActionCreators
const RequestsActionCreators = { SetRequests, DeleteRequest, AddRequest }

// export the RequestsActionCreators
export default RequestsActionCreators;
