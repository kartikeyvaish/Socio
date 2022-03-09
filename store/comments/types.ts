// Imports other types

export interface CommentProps {
    _id?: string;
    comment?: string;
    comment_datetime?: string;
    commented_by?: {
        _id?: string;
        name?: string;
        username?: string;
        profile_picture?: string;
    },
    post_id?: string;
    disabled?: boolean;
}

// interface for Comments IniitalState
export interface CommentsInitialStateProps {
    Comments: Array<CommentProps>;
    Comment: string;
    Loading: boolean;
    Refreshing: boolean;
}

// interface for CommentActions
export interface CommentsActionProps {
    type: string;
    payload?: {
        comment?: string;
        comments?: Array<CommentProps>;
        new_comment?: CommentProps;
        comment_id?: string;
        loading?: boolean;
        refreshing?: boolean;
        index?: number;
    };
}
