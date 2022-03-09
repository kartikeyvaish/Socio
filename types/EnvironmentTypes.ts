// interface for Environment Variables
export interface EnvironmentVariablesProps {
    mode?: 'development' | 'production';
    debug_hash_code?: string;
    OTP_Email_Send_Key?: string;
    SignUP_API_KEY?: string;
    app_logo?: string;
    about_socio?: string;
    developer_image?: string;
    about_owner?: string;
    owner_email?: string;
    owner_github?: string;
    owner_stackoverflow?: string;
    owner_linkedin?: string;

    application_name?: string;
    application_tag_line?: string;
    default_profile_picture?: string;
    realm_app_id?: string;

    apiVersion?: string;
    dev_base_url?: string;
    prod_base_url?: string;

    auth?: string
    otp?: string
    posts?: string
    people?: string
    profile?: string
    stories?: string
    chats?: string

    default_channel_id?: string
    googleApiClientID?: string
    agoraAppID?: string
}