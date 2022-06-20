// import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import { useState } from "react";

// export default function useAuth(code) {
//   const [accessToken, setAccessToken] = useState();
//   const [refreshToken, setRefreshToken] = useState();
//   const [expiresIn, setExpiresIn] = useState();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .post("http://localhost:3001/login", {
//         code,
//       })
//       .then((res) => {
//         setAccessToken(res.data.accessToken);
//         setRefreshToken(res.data.refreshToken);
//         setExpiresIn(res.data.expiresIn);
//         localStorage.setItem("refreshToken", res?.data?.refreshToken);
//         localStorage.setItem("accessToken", res?.data?.accessToken);
//         navigate("/home");
//         // window.history.pushState({}, null, "/home");
//       })
//       .catch(() => {
//         window.location = "/";
//       });
//   }, [code]);

//   useEffect(() => {
//     if (!refreshToken || !expiresIn) return;
//     const interval = setInterval(() => {
//       axios
//         .post("http://localhost:3001/refresh", {
//           refreshToken,
//         })
//         .then((res) => {
//           setAccessToken(res.data.accessToken);
//           setExpiresIn(res.data.expiresIn);
//         })
//         .catch(() => {
//           window.location = "/";
//         });
//     }, (expiresIn - 60) * 1000);

//     return () => clearInterval(interval);
//   }, [refreshToken, expiresIn]);
//   return accessToken;
// }

const useAuth = () => {
  const [accessToken] = useState();
  const refresh = localStorage.getItem("refreshToken");
  const expires = localStorage.getItem("expiresIn");
  if (!refresh) return;
  if (
    new Date().getTime() >= expires ||
    isNaN(expires || accessToken === "undefined")
  ) {
    axios
      .post("http://localhost:4000/refresh", {
        refresh,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res?.data?.accessToken);
        const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
        localStorage.setItem("expiresIn", expires);
      })
      .catch(() => {
        window.location = "/";
      });
  } else {
    if (isNaN(expires) || accessToken === "undefined") {
      axios
        .post("http://localhost:4000/refresh", {
          refresh,
        })
        .then((res) => {
          localStorage.setItem("accessToken", res?.data?.accessToken);
          const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
          localStorage.setItem("expiresIn", expires);
          // navigate("/home");
        })
        .catch(() => {
          window.location = "/";
        });
    } else {
    }
  }
};

export default useAuth;
