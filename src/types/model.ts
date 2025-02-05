export interface User {
  id?: number;
  email?: string;
  first_name: string;
  last_name: string;
  username: string;
  bio: string | null;
  profile_picture: string | null;
}

export interface FileAttachment {
  id: number;
  width: number;
  height: number;
  format: 'jpg' | 'mp4';
  resource_type: 'image' | 'video';
  secure_url: string;
  blurhash: string;
  playback_url: string | null;
  thumbnail: string | null;
}

export interface Post {
  id: number;
  location: string;
  caption: string;
  is_edited: boolean;
  is_archieved: boolean;
  comments_enabled: boolean;
  created_at: string;
  files: Array<FileAttachment>;
  user: User;
  total_likes: number;
  is_liked: boolean;
  total_comments: number;
  is_saved: boolean;
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  user: User;
  comment_replies_count: number;
}

export interface Profile extends User {
  total_posts: number;
}
