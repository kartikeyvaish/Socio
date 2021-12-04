import apiClient from "./client";

const change_password = "/auth/change-password";
const forgot_pass_otp = "/auth/send-forgot-password-otp";
const google_login = "/auth/google-login";
const login = "/auth/login";
const logout = "/auth/logout";
const register = "/auth/register";
const resetPassword = "/auth/reset-password";
const search_users = "/auth/search-users";
const send_email_register_otp = "/auth/send-email-register-otp";

const Login = (DATA) => apiClient.post(login, DATA);

const Register = (DATA) =>
  apiClient.post(register, DATA, {
    timeout: 30000,
  });

const Logout = (Token) =>
  apiClient.delete(
    logout,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

const SearchQuery = (Query, Token) =>
  apiClient.get(
    search_users,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      params: {
        search: Query,
      },
    }
  );

const Send_Email_Register_OTP = (Email) =>
  apiClient.post(send_email_register_otp, { Email: Email });

const SendForgotPassOTP = (DATA) => apiClient.post(forgot_pass_otp, DATA);

const ResetPassword = (DATA) => apiClient.post(resetPassword, DATA);

const ChangePassword = (DATA, Token) =>
  apiClient.put(change_password, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

const GoogleLogin = (DATA) => apiClient.post(google_login, DATA);

export default {
  Login,
  Register,
  Logout,
  SearchQuery,
  Send_Email_Register_OTP,
  SendForgotPassOTP,
  ChangePassword,
  ResetPassword,
  GoogleLogin,
};
