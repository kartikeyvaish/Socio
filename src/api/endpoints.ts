const auth = {
  login: '/auth/login',
  verify_login_otp: '/auth/verify-login-otp',
  email_sign_up: '/auth/verify-email',
  verify_email_sign_up_otp: '/auth/verify-email-otp',
  verify_username: '/auth/verify-username',
  signup: '/auth/signup',
  refresh_session: '/auth/refresh'
};

const posts = {
  show: (post_id: string) => `/posts/${post_id}`
};

const endpoints = {
  auth,
  posts
};

export default endpoints;
