import { React, useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/loginPage";
    } else {
      (async () => {
        try {
          const data = await axios.get("http://localhost:8000/api/home/", {
            headers: { "content-Type": "application/json" },
          });
          setMessage(data.message);
        } catch (error) {
          console.log("AUTH not valid");
        }
      })();
    }
  }, []);
  return (
    <>
      <h1>this is home page and this is {message}</h1>
    </>
  );
}
