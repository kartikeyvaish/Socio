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
  first_name: string;
  id: number;
  last_name: string;
  login_id: number;
  profile_picture: string;
  username: string;
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
    file_type: string;
    width: number;
    height: number;
    blurhash: string;
    asset_id: string;
  }[];
  is_edited: boolean;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  is_archived: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
