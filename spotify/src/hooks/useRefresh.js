import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState();
  // const [refreshToken, setRefreshToken] = useState();
  // const [expiresIn, setExpiresIn] = useState();

  const refreshToken = localStorage.getItem("refreshToken");
  const expiresIn = localStorage.getItem("expiresIn");

  const getAccessToken = () => {
    if (!refreshToken) return;
    axios
      .post("http://localhost:4000/refresh", {
        refreshToken,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("expiresIn", res.data.expiresIn);
        setAccessToken(res.data.accessToken);
        return res.data.accessToken;
      })
      .catch(() => {
        window.location = "/";
      });
  };
  return [getAccessToken];
}
