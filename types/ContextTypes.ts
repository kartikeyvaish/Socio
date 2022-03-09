// Packages Imports
import { Theme } from "@react-navigation/native";
import { ApisauceInstance } from "apisauce";
import { UserProps } from "../store/auth/types";
import { RequestProps } from "../store/requests/types";
import { ProfileStoriesProps, StoryItemProps } from "../store/stories/types";

// Other Types
import { ChildrenProps } from "./GlobalTypes";
import { PostProps } from "./PostTypes";

// interface for ThemeContext
export interface ThemeContextProps {
    ChangeMode?: (mode: string, isSystemDefault?: boolean) => void;
    theme?: Theme
    isSystemDefault?: boolean;
}

// interface for ThemeProvider
export interface ThemeProviderProps extends ChildrenProps { navigationBarResponsive?: boolean; }

// interface for GlobalContext
export interface GlobalContextProps {
    User?: UserProps;
    SetUser?: (user: UserProps) => void;
    FeedPosts?: Array<PostProps>;
    Requests?: Array<RequestProps>
    showSnack?: ({ message, color }: { message?: string; color?: string }) => void;
    authAPIClient?: ApisauceInstance;
    appApiClient?: ApisauceInstance;
    SearchResults?: Array<UserProps>;
    FeedStories?: Array<StoryItemProps>;
    ProfileStories?: ProfileStoriesProps;
    PushToken?: string;
    SetPushToken?: (token: string) => void;
}

// interface for GlobalProvider
export interface GlobalProviderProps extends GlobalContextProps, ChildrenProps {
    Logout?: () => void;
}