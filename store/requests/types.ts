// interface for the request props
export interface RequestProps {
    _id?: string;
    request_from: {
        _id?: string,
        name?: string,
        profile_picture?: string,
        username?: string
    },
    request_to?: string;
    request_datetime?: Date;
}

// interface for initial state of requests reducer
export interface RequestsInitialStateProps {
    requests?: Array<RequestProps>
}

// RequestsActionProps interface
export interface RequestsActionProps {
    type: string;
    payload?: { requests?: Array<RequestProps>; request_id?: string, request?: RequestProps };
}