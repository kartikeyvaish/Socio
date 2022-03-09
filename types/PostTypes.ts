import { UserProps } from "../store/auth/types";
import { PostVideoProps } from "./ComponentTypes";

// interface for PostCardProps
export interface PostCardProps extends PostProps, PostVideoProps {

    // Name and Location Props
    onNamePress?: (_id: string) => void;
    onLocationPress?: () => void;
    showMenuIcon?: boolean;
    onMenuIconPress?: () => void;

    // Like Button Props
    onLikePress?: (_id: string) => void;
    onUnLikePress?: (_id: string) => void;
    onShowAllLikesPress?: (_id: string) => void;
    onLikeCountUpdate?: (_id: string, likes_count: number) => void;

    // Comments Props
    onCommentPress?: (_id: string) => void;
}

// interface for PostType
export interface PostProps {
    // post props
    _id: string;
    post_owner_id?: string;
    file: PostFileProps;
    local_uri?: string;
    thumbnail_image?: PostFileProps;
    location?: string;
    caption?: string;
    post_datetime?: string;
    post_owner_details: UserProps;
    likes_count?: number;
    comments_count?: number;
    is_liked?: boolean;
}

// interface for PostFileType
export interface PostFileProps {
    _id?: string;
    uri?: string;
    mimeType?: "image/png" | "image/jpeg" | "image/jpg" | "image/gif" | "video/mp4";
    width?: number;
    height?: number;
    public_id?: string;
}