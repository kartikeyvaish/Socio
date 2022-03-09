// Imports other types
import { PostProps } from "../../types/PostTypes";

// interface for Feed IniitalState
export interface FeedInitialStateProps {
    FeedPosts: Array<PostProps>;
}

// interface for FeedActions
export interface FeedActionProps {
    type: string;
    payload?: {
        posts?: Array<PostProps>;
        _id?: string,
        likes_count?: number,
        local_uri?: string;
        comments_count?: number;
    };
}
