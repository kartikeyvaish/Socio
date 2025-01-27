export interface User {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  profile_image?: string | null;
}

export interface FileAttachment {
  width: number;
  height: number;
  format: 'jpg' | 'mp4';
  resource_type: 'image' | 'video';
  secure_url: string;
  thumbhash: string;
  playback_url: string | null;
  thumbnail_url: string | null;
}

export interface Post {
  id: number;
  location: string;
  caption: string;
  is_edited: boolean;
  comments_enabled: boolean;
  created_at: string;
  files: Array<FileAttachment>;
  user: User;
}
