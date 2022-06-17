import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";
import { loginUrl } from "../spotify";
import { useDataLayerValue } from "../context/DataLayer";

function Login() {
  const history = useHistory();
  const [{}, dispatch] = useDataLayerValue();
  const accessToken = localStorage.getItem("accessToken");
  const expiresIn = localStorage.getItem("expiresIn");
  const refreshToken = localStorage.getItem("refreshToken");

  return (
    <div className="login">
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
}

export default Login;
