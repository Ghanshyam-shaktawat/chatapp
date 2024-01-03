import axios from "axios";

let refresh = false;
axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.request.status === 401 && !refresh) {
      refresh = true;
      console.log(localStorage.getItem("refresh_token"));
      const response = await axios.post(
        "http://localhost:8000/api/token/refresh/",
        {
          refresh: localStorage.getItem("refresh_token"),
        },
        { headers: { "content-Type": "application/json" } },
        { withCredentials: true }
      );
      const accessToken = response.data["access"];
      const refreshToken = response.data["refresh"];
      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
