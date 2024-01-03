import { React, useEffect, useState } from "react";
import axios from "axios";

export default function Logout() {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          "url",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          { headers: { "content-Type": "application/json" } },
          { withCredentials: true }
        );
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/loginPage";
      } catch (error) {
        console.log("unable to logout");
      }
    })();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}
