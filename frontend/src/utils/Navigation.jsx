import { Link } from "@mui/material";
import { React, useState, useEffect } from "react";


export default function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access-token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);
  return (
    <>
      <div id="navBar">
        {isAuth ? <Link>home</Link> : null}
        {isAuth ? (
          <Link href="">Logout</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </>
  );
}
