// import types
import { AuthInitialStateProps } from "../store/auth/types";
import { ChatsInitialStateProps } from "../store/chats/types";
import { FeedInitialStateProps } from './../store/feed/types';
import { ProfileInitialStateProps } from "../store/profile/types";
import { RequestsInitialStateProps } from "../store/requests/types";
import { SearchInitialStateProps } from "../store/search/types";
import { StoriesInitialStateProps } from "../store/stories/types";
import { ThemeInitialStateProps } from './../store/theme/types';

// interface for the store state
export interface StoreStateInterface {
    // Auth Reducer
    AuthState: AuthInitialStateProps,
    // Chats Reducer
    ChatsState: ChatsInitialStateProps,
    // Feed Reducer
    FeedState: FeedInitialStateProps,
    // Profile Reducer
    ProfileState: ProfileInitialStateProps,
    // Requests Reducer
    RequestsState: RequestsInitialStateProps,
    // Search Reducer
    SearchState: SearchInitialStateProps,
    // Stories Reducer
    StoriesState: StoriesInitialStateProps,
    // Theme Reducer
    ThemeState: ThemeInitialStateProps,
}