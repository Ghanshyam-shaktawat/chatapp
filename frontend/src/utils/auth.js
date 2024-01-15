import { userAuthStore } from "../store/store";
import axios from "./axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const login = async (username, password) => {
  try {
    const { data, status } = await axios.post("token/", {
      username,
      password,
    });
    if (status === 200) {
      setAuthUser(data.access, data.refresh);
    }
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data?.detail || "something went wrong",
    };
  }
};

export const register = async (
  username,
  firstName,
  lastName,
  email,
  password,
  password2,
) => {
  try {
    const { status } = await axios.post("register/", {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password2: password2,
    });
    if (status === 200) {
      return;
    }
  } catch (error) {
    return {
      data: null,
      error: error.response.data || "something went wrong",
    };
  }
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  userAuthStore.getState().setUser(null);
};
export const setUser = async () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  if (!accessToken || !refreshToken) {
    return;
  }
  if (isAccessTokenExpired(accessToken)) {
    const response = await getAccessToken(refreshToken);
    setAuthUser(response.access, response.refresh);
  }
};

export const setAuthUser = (access_token, refresh_token) => {
  Cookies.set("access_token", access_token, {
    expires: 1,
    secure: true,
  });

  Cookies.set("refresh_token", refresh_token, {
    expires: 7,
    secure: true,
  });
  const user = jwtDecode(access_token) ?? null;

  if (user) {
    userAuthStore.getState().setUser(user);
  }
  userAuthStore.getState().setLoading(false);
};

export const getAccessToken = async (refresh_token) => {
  const response = await axios.post("token/refresh/", {
    refresh: refresh_token,
  });
  return response.data;
};
export const isAccessTokenExpired = (accessToken) => {
  try {
    const decodedToken = jwtDecode(accessToken);
    return decodedToken.exp < Date.now() / 1000;
  } catch (err) {
    return true;
  }
};
