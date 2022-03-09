// Types Imports 
import { PostProps } from "../../types/PostTypes";

// interface for initial state of requests reducer
export interface ProfileInitialStateProps {
    ProfilePosts?: Array<PostProps>;
    FollowersCount?: number;
    FollowingCount?: number;
}

// ProfileActionProps interface
export interface ProfileActionProps {
    type: string;
    payload?: {
        posts?: Array<PostProps>,
        followersCount?: number,
        followingCount?: number,
        post_id?: string,
        post?: PostProps,
        likes_count?: number,
        comments_count?: number,
        local_uri?: string,
    };
}