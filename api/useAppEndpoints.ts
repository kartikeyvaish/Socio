// Custom hook that contain all the API endpoints

// Client import
import { useContext } from "react";
import { ApiResponse } from "apisauce";

// Packages Imports 
import env from "../config/env";
import GlobalContext from "../context/GlobalContext";

// Main Route for Posts Endpoints
const AuthRoute = env.auth;
const ChatsRoute = env.chats;
const PeopleRoute = env.people;
const PostsRoute = env.posts;
const ProfileRoute = env.profile;
const StoriesRoute = env.stories;

export default function useAppEndpoints() {
    const { appApiClient } = useContext(GlobalContext);

    // function to call Accept API Endpoint
    async function AcceptRequest(DATA: any): Promise<ApiResponse<any>> {
        return appApiClient.put(`${PeopleRoute}/accept-follow-request`, DATA);
    }

    // function to call Change password Endpoint
    async function ChangePassword(DATA: any): Promise<ApiResponse<any, any>> {
        return appApiClient.put(`${AuthRoute}/change-password`, DATA);
    }

    // function to create new post
    async function CreatePost(DATA: any): Promise<ApiResponse<any, any>> {
        return appApiClient.post(`${PostsRoute}/create-post`, DATA);
    }

    // function to delete comment
    async function DeleteComment(comment_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.delete(`${PostsRoute}/delete-comment`, {}, {
            data: { comment_id }
        });
    }

    // function to delete chat
    async function DeleteChat(chat_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.delete(`${ChatsRoute}/delete-chat`, {}, {
            data: { chat_id }
        });
    }

    // function to delete request
    async function DeleteRequest(DATA: any): Promise<ApiResponse<any>> {
        return appApiClient.delete(`${PeopleRoute}/delete-follow-request`, {}, {
            data: DATA
        });
    }

    // Delete a story
    async function DeleteStory(story_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.delete(`${StoriesRoute}/delete-story`, {}, {
            data: { story_id }
        });
    }

    // Delete a post
    async function DeletePost(post_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.delete(`${PostsRoute}/delete-post`, {}, {
            data: { post_id }
        });
    }

    // function to call Edit Profile endpoint
    async function EditProfile(DATA: any): Promise<ApiResponse<any, any>> {
        return appApiClient.put(`${AuthRoute}/edit-profile`, DATA);
    }

    // Follow or send a follow request
    async function Follow(user_id: string): Promise<ApiResponse<any>> {
        return appApiClient.post(`${PeopleRoute}/follow`, { user_id });
    }

    // Get Comments for a post
    async function GetComments(post_id: string): Promise<ApiResponse<any>> {
        return appApiClient.get(`${PostsRoute}/get-comments`, { post_id });
    }

    // function to call GetFeedPosts api
    async function GetFeedPosts({ last_post_id, limit }: { last_post_id?: string, limit?: number }): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${PostsRoute}/get-posts`, { last_post_id, limit });
    }

    // function to get chats for a user
    async function GetChats(): Promise<ApiResponse<any>> {
        return appApiClient.get(`${ChatsRoute}/get-chats`);
    }

    // function to get followRequests
    async function GetFollowRequests(): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${PeopleRoute}/get-follow-requests`);
    }

    // function to get followers
    async function GetFollowers(user_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${PeopleRoute}/get-followers`, { user_id });
    }

    // function to get following
    async function GetFollowing(user_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${PeopleRoute}/get-following`, { user_id });
    }

    // function to get likes
    async function GetLikes(post_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${PostsRoute}/get-likes`, { post_id });
    }

    // function to egt messges
    async function GetMessages(chat_id: string, skip?: number): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${ChatsRoute}/get-messages`, { chat_id, skip });
    }

    // function to get new chat users
    async function GetNewChatUsers(): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${ChatsRoute}/get-new-chat-users`);
    }

    // function to get or create a new chatRoom
    async function GetOrCreateChatRoom(user_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.post(`${ChatsRoute}/get-or-create-chat`, { user_id });
    }

    // function to get profile
    async function GetProfile(user_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${ProfileRoute}/get-profile`, { user_id });
    }

    // get post details
    async function GetPostDetails(post_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${PostsRoute}/get-post-details`, { post_id });
    }

    // get Stories
    async function GetStories(): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${StoriesRoute}/get-stories`);
    }

    // Get story views
    async function GetStoryViews(story_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${StoriesRoute}/get-views`, { story_id });
    }

    // function to like a post
    async function LikePost(post_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.post(`${PostsRoute}/like-post`, { post_id });
    }

    // function to Logout
    async function Logout(): Promise<ApiResponse<any, any>> {
        return appApiClient.delete(`${AuthRoute}/logout`);
    }

    // mark chat as read
    async function MarkChatAsRead(chat_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.put(`${ChatsRoute}/mark-messages-as-read`, { chat_id });
    }

    // mark story as viewed
    async function MarkStoryViewed(story_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.put(`${StoriesRoute}/mark-story-as-viewed`, { story_id });
    }

    // function to add a commnet
    async function PostComment(post_id: string, comment: string): Promise<ApiResponse<any, any>> {
        return appApiClient.post(`${PostsRoute}/post-comment`, { post_id, comment });
    }

    // Post a story
    async function PostStory(DATA: any): Promise<ApiResponse<any, any>> {
        return appApiClient.post(`${StoriesRoute}/post-story`, DATA);
    }

    // Remove a person from followers
    async function RemoveFollower(user_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.delete(`${PeopleRoute}/remove-follower`, {}, {
            data: { user_id }
        });
    }

    // function to search
    async function Search(query: string): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${PeopleRoute}/search`, { query });
    }

    // function to search chat users
    async function SearchChatUsers(query: string): Promise<ApiResponse<any, any>> {
        return appApiClient.get(`${ChatsRoute}/search-chat-users`, { query });
    }

    // function to send message
    async function SendMessage(DATA: any): Promise<ApiResponse<any, any>> {
        return appApiClient.post(`${ChatsRoute}/send-message`, DATA);
    }

    // function to toggle push notification
    async function TogglePushNotification(): Promise<ApiResponse<any, any>> {
        return appApiClient.put(`${AuthRoute}/toggle-push-notification`, {});
    }

    // function to toggle profile privacy 
    async function TogglePrivate(): Promise<ApiResponse<any, any>> {
        return appApiClient.put(`${AuthRoute}/toggle-profile-private`, {});
    }

    // function to call Unfollow api
    async function Unfollow(user_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.post(`${PeopleRoute}/unfollow`, { user_id });
    }

    // function to unlike a post
    async function UnlikePost(post_id: string): Promise<ApiResponse<any, any>> {
        return appApiClient.delete(`${PostsRoute}/unlike-post`, {}, {
            data: { post_id }
        });
    }

    return {
        GetFeedPosts,
        ChangePassword,
        TogglePushNotification,
        EditProfile,
        CreatePost,
        GetFollowRequests,
        AcceptRequest,
        DeleteRequest,
        TogglePrivate,
        GetFollowers,
        GetFollowing,
        RemoveFollower,
        Unfollow,
        GetProfile,
        Search,
        Follow,
        LikePost,
        UnlikePost,
        GetPostDetails,
        GetLikes,
        GetComments,
        PostComment,
        DeleteComment,
        GetStories,
        PostStory,
        MarkStoryViewed,
        DeleteStory,
        GetStoryViews,
        DeletePost,
        GetChats,
        DeleteChat,
        GetNewChatUsers,
        GetOrCreateChatRoom,
        SearchChatUsers,
        GetMessages,
        MarkChatAsRead,
        SendMessage,
        Logout
    }
}