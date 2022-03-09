// Imports other types
import Animated from 'react-native-reanimated';
import { } from '../../types/ComponentTypes';

// interface for Index
export interface StoryIndexProps {
    index?: number;
}

// interface for Animation Props for StoryCard
export interface StoryCardAnimatedProps extends StoryIndexProps {
    scrollX?: Animated.SharedValue<number>;
    current_viewing?: string;
}

export interface StoriesCardProps extends StoryCardAnimatedProps, StoryIndexProps, StoryUserProps {
    stories?: Array<StoryItemProps> & Array<EachStoryItemProps>;
    onLastItemFinished?: () => void;
    onGoToPreviousItem?: () => void;
    onViewCountPress?: (story_id: string) => void;
    onNamePress?: (_id?: string, username?: string, profile_picture?: string) => void,
    showIcon?: boolean,
    onIconPress?: (_id?: string) => void,
}

export interface StoryFileProps {
    _id?: string;
    uri?: string;
    mimeType?: string;
    width?: number;
    height?: number;
    public_id?: string;
    duration?: number;
    datetime?: string;
}

export interface StoryFileCardProps {
    onVideoFinish?: () => void;
    shouldVideoPlay?: boolean;
    uri?: string;
    mimeType?: string;
}

export interface EachStoryItemProps {
    file?: StoryFileProps,
    viewed_by_you?: boolean,
    view_count?: Number,
    _id?: string
}


export interface StoriesArrayProps {
    stories?: Array<EachStoryItemProps>,
}

// interface for StoryUser
export interface StoryUserProps {
    _id?: string,
    username?: string,
    profile_picture?: string,
}

// headerProps 
export interface StoriesHeaderProps extends StoryUserProps {
    onNamePress?: () => void,
    datetime?: string,
    showIcon?: boolean,
    onIconPress?: (_id?: string) => void,
}

// export each story item
export interface StoryItemProps extends StoriesArrayProps, StoryUserProps {
    viewed_by_you?: boolean,
}

// interface for ProfileStories
export interface ProfileStoriesProps {
    stories?: Array<EachStoryItemProps>,
    viewed_by_you?: boolean,
}

// interface for Stories IniitalState
export interface StoriesInitialStateProps {
    FeedStories?: Array<StoryItemProps>;
    ProfileStories?: ProfileStoriesProps
}

// interface for StoriesActions
export interface StoriesActionProps {
    type: string;
    payload?: {
        stories?: Array<StoryItemProps>;
        viewed_by_you?: boolean,
        profile_stories?: ProfileStoriesProps,
        profile_stories_viewed_by_you?: boolean,
        profile_story?: EachStoryItemProps
        profile_story_id?: string;
        story_owner_id?: string;
        story_id?: string;
    };
}
