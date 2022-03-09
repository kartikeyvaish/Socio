// Imports other types
import { UserProps } from './../auth/types';

// interface for Comments IniitalState
export interface SearchInitialStateProps {
    SearchResults?: Array<UserProps>
}

// interface for CommentActions
export interface SearchActionProps {
    type: string;
    payload?: {
        user?: UserProps;
        user_id?: string;
        results?: Array<UserProps>;
    };
}
