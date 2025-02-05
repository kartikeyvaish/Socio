const auth = {
  login: '/auth/login',
  verify_login_otp: '/auth/verify-login-otp',
  email_sign_up: '/auth/verify-email',
  verify_email_sign_up_otp: '/auth/verify-email-otp',
  verify_username: '/auth/verify-username',
  signup: '/auth/signup',
  initiateResetPassword: '/auth/initiate-reset-password',
  refresh_session: '/auth/refresh'
};

const posts = {
  show: (post_id: number) => `/posts/${post_id}`,
  like: (post_id: number) => `/posts/${post_id}/like`,
  unlike: (post_id: number) => `/posts/${post_id}/unlike`,
  save: (post_id: number) => `/posts/${post_id}/save`,
  unsave: (post_id: number) => `/posts/${post_id}/unsave`,
  comment: (post_id: number) => `/posts/${post_id}/comment`,
  comments: (post_id: number) => `/posts/${post_id}/comments`
};

const feed = {
  getFeed: '/feed'
};

const profile = {
  getProfilePosts: `/profile/posts/list`,
  getProfileDetails: (user_id: string) => `/profile/${user_id}`
};

const endpoints = {
  auth,
  posts,
  feed,
  profile
};

export default endpoints;
