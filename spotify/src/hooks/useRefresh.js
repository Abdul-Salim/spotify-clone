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
      .post(`${process.env.REACT_APP_API_URL}/refresh`, {
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
