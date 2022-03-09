// User Props
export interface UserProps {
    _id?: string;
    email?: string;
    name?: string;
    profile_picture?: string;
    username?: string;
    bio?: string;
    account_verified?: boolean;
    private_profile?: boolean;
    allow_push_notification?: boolean;
    phone?: string;
}

// interface for AuthInitialState
export interface AuthInitialStateProps {
    User?: UserProps,
    PushToken?: string;
}

// interface for AuthActions
export interface AuthActionProps {
    type: string;
    payload?: {
        User?: UserProps;
        PushToken?: string;
    };
}