import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";

import Footer from "../Footer";
import Sidebar from "../Sidebar";
import Header from "../Header";
import spotifyApi from "../../spotify";
import { getTokenFromUrl } from "../../spotify";
import PortalRoutes from "../../routes/portal";
import { tokenState } from "../../recoil/atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { allPlaylists } from "../../recoil/atoms/playlistStateAtom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("error", error);
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

const Portal = () => {
  const [, setToken] = useRecoilState(tokenState);
  const navigate = useNavigate();

  const refreshToken = localStorage.getItem("refreshToken");
  const expiresIn = localStorage.getItem("expiresIn");
  const accessToken = localStorage.getItem("accessToken");
  const [playList, setPlayLists] = useRecoilState(allPlaylists);

  useEffect(() => {
    if (accessToken) {
      spotifyApi?.setAccessToken(accessToken);
      spotifyApi
        ?.getUserPlaylists()
        .then((res) => {
          setPlayLists(res?.body);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      if (!accessToken || new Date().getTime() >= expiresIn) {
        axios
          .post("http://localhost:4000/refresh", {
            refreshToken,
          })
          .then((res) => {
            console.log(res);
            localStorage.setItem("accessToken", res?.data?.accessToken);
            const expires = new Date().getTime() + res?.data?.expiresIn * 1000;

            localStorage.setItem("expiresIn", expires);
            setToken(res?.data?.accessToken);
            spotifyApi.setAccessToken(accessToken);
            navigate("/home");
          })
          .catch(() => {
            window.location = "/";
          });
      } else {
        setToken(accessToken);
      }
    } else {
      navigate("/auth");
    }
  }, [navigate, refreshToken]);

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
