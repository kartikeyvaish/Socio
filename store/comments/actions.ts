// Types and Actions Imports
import * as actionTypes from "./actionTypes";
import { CommentProps, CommentsActionProps } from "./types";

// Comments Action Creators 

// function to set comment
const SetComment = (comment: string): CommentsActionProps => {
    return {
        type: actionTypes.SET_COMMENT,
        payload: { comment }
    }
}

// function to set comments
const SetComments = (comments: Array<CommentProps>): CommentsActionProps => {
    return {
        type: actionTypes.SET_COMMENTS,
        payload: { comments }
    }
}

// function to add comment
const AddComment = (new_comment: CommentProps): CommentsActionProps => {
    return {
        type: actionTypes.ADD_COMMENT,
        payload: { new_comment }
    }
}

// function to add a comment at a particular index
const AddCommentAtIndex = (new_comment: CommentProps, index: number): CommentsActionProps => {
    return {
        type: actionTypes.ADD_COMMENT_AT_INDEX,
        payload: { new_comment, index }
    }
}

// function to delete comment
const DeleteComment = (comment_id: string): CommentsActionProps => {
    return {
        type: actionTypes.DELETE_COMMENT,
        payload: { comment_id }
    }
}

// function to set loading
const SetLoading = (loading: boolean): CommentsActionProps => {
    return {
        type: actionTypes.SET_LOADING,
        payload: { loading }
    }
}

// function to set refreshing
const SetRefreshing = (refreshing: boolean): CommentsActionProps => {
    return {
        type: actionTypes.SET_REFRESHING,
        payload: { refreshing }
    }
}

// function to update comment
const UpdateComment = (new_comment: CommentProps, comment_id: string): CommentsActionProps => {
    return {
        type: actionTypes.UPDATE_COMMENT,
        payload: { new_comment, comment_id }
    }
}

// Assemble Comments Actions
const CommentActions = {
    SetComment,
    SetComments,
    AddComment,
    DeleteComment,
    SetLoading,
    SetRefreshing,
    AddCommentAtIndex,
    UpdateComment
};

// Exports
export default CommentActions;