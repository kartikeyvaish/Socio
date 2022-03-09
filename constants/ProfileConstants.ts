// Imports
import env from '../config/env';
import { SelectedFileProps } from '../types/HooksTypes';

// default Profile Picture
export const default_profile_picture: SelectedFileProps = {
    mimeType: 'image/png',
    uri: env.default_profile_picture,
    name: 'default_profile_picture.png',
}