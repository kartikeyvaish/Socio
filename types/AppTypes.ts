// Interface for the theme object
export interface AppThemeProps {
  dark: boolean;
  colors: {
    background: string;
    card: string;
    border: string;
    primary: string;
    text: string;
    notification: string;
  };
}

export interface UserProps {
  id: number;
  first_name: string;
  last_name: string;
  login_id: number;
  profile_picture: string;
  username: string;

  // Extra Details After Login...Basically from Profile Section
  bio?: string;
  posts_count?: number;
  followers_count?: number;
  following_count?: number;
  is_self?: boolean;
}

export interface FileItemProps {
  name: string;
  type: string;
  uri: string;
}

export interface PickedFileProps extends FileItemProps {
  id: string;
  fileType: "image" | "video" | "unknown";
  thumbnail?: {
    uri: string;
    name: string;
    type: string;
  };
}

export interface PostProps {
  id: number;
  caption: string;
  location: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    profile_picture: string;
  };
  files: {
    url: string;
    thumbnail_url: string;
    file_type: "image" | "video";
    width: number;
    height: number;
    blurhash: string;
    asset_id: string;
  }[];
  cover_thumbnail: string;
  cover_blurhash: string;
  is_edited: boolean;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  is_archived: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
