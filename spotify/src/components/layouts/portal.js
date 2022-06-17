import React, { useState, useEffect } from "react";
import { Route, Redirect, useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useDataLayerValue } from "../../context/DataLayer";
import spotifyApi from "../../spotify";
import { getTokenFromUrl } from "../../spotify";
import PortalRoutes from "../../routes/portal";

// export const spotify = new SpotifyWebApi();

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className="something-wrong">
          <div className="something-wrong--inner">
            <h3>Something went wrong.</h3>
          </div>
        </div>
      );
    }

    return children;
  }
}
// const renderComponents = (
//   <>
//     {portalRoutes.map((prop) => {
//       if (prop.redirect) {
//         return <Redirect from={prop.path} to={prop.to} key={prop.key} />;
//       }
//       return (
//         <Route
//           path={prop.path}
//           exact={prop.exact}
//           component={prop.component}
//           key={prop.key}
//         />
//       );
//     })}
//     </>
// );

const Portal = () => {
  const navigate = useNavigate();
  const [, dispatch] = useDataLayerValue();
  const accessToken = localStorage.getItem("accessToken");
  const expiresIn = localStorage.getItem("expiresIn");
  const refreshToken = localStorage.getItem("refreshToken");

  const code = getTokenFromUrl();

  useEffect(() => {
    if (!refreshToken || refreshToken === null) {
      axios
        .post("http://localhost:4000/login", {
          code,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("refreshToken", res?.data?.refreshToken);
          localStorage.setItem("accessToken", res?.data?.accessToken);
          const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
          localStorage.setItem("expiresIn", expires);
          spotifyApi.setAccessToken(res?.data?.accessToken);
          spotifyApi.setRefreshToken(res?.data?.refreshToken);
          dispatch({
            type: "SET_TOKEN",
            accessToken: res.data.accessToken,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [code, dispatch, refreshToken]);

  // useEffect(() => {

  //   spotify.setAccessToken(accessToken);
  // }, [accessToken]);

  // useEffect(() => {
  //   if (refreshToken) {
  //     if (isNaN(expiresIn) || accessToken === "undefined") {
  //       axios
  //         .post("http://localhost:3001/refresh", {
  //           refreshToken,
  //         })
  //         .then((res) => {
  //           console.log(res);
  //           localStorage.setItem("accessToken", res?.data?.accessToken);
  //           const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
  //           localStorage.setItem("expiresIn", expires);
  //           dispatch({
  //             type: "SET_TOKEN",
  //             accessToken: res?.data?.accessToken,
  //           });
  //           spotifyApi?.setAccessToken(res?.data?.accessToken);
  //           getPlaylists()
  //             .then((res) => {
  //               console.log("res", res);
  //               dispatch({
  //                 type: "SET_PLAYLISTS",
  //                 playlists: res?.data,
  //               });
  //             })
  //             .catch((err) => {
  //               console.log("err", err);
  //             });
  //           getMe()
  //             .then((res) => {
  //               console.log(res);
  //               dispatch({
  //                 type: "SET_USER",
  //                 user: res?.data,
  //               });
  //             })
  //             .catch((err) => {
  //               console.log("err", err);
  //             });
  //           navigate("/home");
  //         })
  //         .catch(() => {
  //           window.location = "/";
  //         });
  //     } else {
  //       dispatch({
  //         type: "SET_TOKEN",
  //         accessToken: accessToken,
  //       });
  //       spotifyApi?.setAccessToken(accessToken);
  //       getPlaylists()
  //         .then((res) => {
  //           console.log("res", res);
  //           dispatch({
  //             type: "SET_PLAYLISTS",
  //             playlists: res?.data,
  //           });
  //         })
  //         .catch((err) => {
  //           console.log("err", err);
  //         });
  //       getPlaylists()
  //         .then((res) => {
  //           console.log("res", res);
  //           dispatch({
  //             type: "SET_PLAYLISTS",
  //             playlists: res?.data,
  //           });
  //         })
  //         .catch((err) => {
  //           console.log("err", err);
  //         });
  //       getMe()
  //         .then((res) => {
  //           console.log(res);
  //           dispatch({
  //             type: "SET_USER",
  //             user: res?.data,
  //           });
  //         })
  //         .catch((err) => {
  //           console.log("err", err);
  //         });
  //     }
  //   } else {
  //     navigate("/auth");
  //   }
  // }, [accessToken, dispatch, expiresIn, history, refreshToken]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!refreshToken) navigate("/auth");
  //     if (
  //       new Date().getTime() >= expiresIn ||
  //       isNaN(expiresIn || accessToken === "undefined")
  //     ) {
  //       axios
  //         .post("http://localhost:3001/refresh", {
  //           refreshToken,
  //         })
  //         .then((res) => {
  //           localStorage.setItem("accessToken", res?.data?.accessToken);
  //           const expires = new Date().getTime() + res?.data?.expiresIn * 1000;
  //           localStorage.setItem("expiresIn", expires);
  //           dispatch({
  //             type: "SET_TOKEN",
  //             accessToken: accessToken,
  //           });
  //           spotifyApi?.setAccessToken(accessToken);
  //           getPlaylists()
  //             .then((res) => {
  //               console.log("res", res);
  //               dispatch({
  //                 type: "SET_PLAYLISTS",
  //                 playlists: res?.data,
  //               });
  //             })
  //             .catch((err) => {
  //               console.log("err", err);
  //             });
  //           getMe()
  //             .then((res) => {
  //               dispatch({
  //                 type: "SET_USER",
  //                 user: res?.body,
  //               });
  //             })
  //             .catch((err) => {
  //               console.log("err", err);
  //             });
  //         })
  //         .catch(() => {
  //           window.location = "/";
  //         });
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [accessToken, dispatch, expiresIn, history, refreshToken]);

  return (
    <div>
      <ErrorBoundary>
        <div className="player__body">
          <Sidebar />
          <Header />
          <PortalRoutes />
        </div>
        <Footer spotify={spotifyApi} />
      </ErrorBoundary>
    </div>
  );
};

export default Portal;
