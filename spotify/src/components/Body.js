import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import "../styles/Body.css";
import PlayIcon from "./PlayIcon";
import { discoverWeeklyState } from "../recoil/atoms/userAtom";
import spotifyAPI from "../spotify";
import { playerState } from "../recoil/atoms/playerStateAtom";
import { Link, useNavigate } from "react-router-dom";
import { headerState } from "../recoil/atoms/headerStateAtom";

const Body = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);
  const [headerStateVal, setHeaderState] = useRecoilState(headerState);
  const discoverWeekly = useRecoilValue(discoverWeeklyState);
  const [usersTopArtists, setusersTopArtists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [show, setShow] = useState();
  const accessToken = localStorage.getItem("accessToken");
  // const playPlaylist = (id) => {
  //   dispatch({
  //     type: "SET_PLAYING_TRACK",
  //     playingTrack: id,
  //   });
  // };
  // const playSong = (track) => {
  //   dispatch({
  //     type: "SET_PLAYING_TRACK",
  //     playingTrack: track,
  //   });
  // };
  // const chooseTrack = (track) => {
  //   dispatch({
  //     type: "SET_PLAYING_TRACK",
  //     playingTrack: track,
  //   });
  // };

  useEffect(() => {
    if (!accessToken) return;
    spotifyAPI.setAccessToken(accessToken);
    spotifyAPI
      .getNewReleases({ limit: 5, offset: 0, country: "IN" })
      .then((data) => {
        setNewReleases(data?.body);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
    spotifyAPI
      .getFeaturedPlaylists({
        limit: 5,
        offset: 1,
        country: "IN",
        timestamp: "2014-10-23T09:00:00",
      })
      .then((data) => {
        setFeatured(data?.body);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });

    spotifyAPI.getMyTopTracks().then(
      function (data) {
        let topTracks = data.body.items;
        console.log(topTracks);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);

  const playPlaylist = (e, id) => {
    console.log(id);
    // e.stopPropogation();
    setPlayerState({ ...playerStateVal, playingTrack: id });
  };

  const changeNavbarColor = () => {
    if (ref.current.scrollTop >= 80) {
      setHeaderState({ ...headerStateVal, isBlack: true });
    } else {
      setHeaderState({ ...headerStateVal, isBlack: false });
    }
  };

  return (
    <div className="body" ref={ref} onScroll={changeNavbarColor}>
      <div style={{ marginTop: "40px" }}>
        <div className="search-results">
          {usersTopArtists?.map((item) => (
            <div className="">{/* <img src={item.} */}</div>
          ))}
          {/* <PlayIcon height="56" width="56" /> */}
          <div className="body__songs">
            {/* <div className="body__icons">
          <PlayCircleIcon
            className="body__shuffle"
            onClick={() => playPlaylist(playlists?.items[1])}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div> */}
            <div className="result-head">
              <h2 className="head text-white">New Releases</h2>
              <Link to="/" className="see-all">
                SEE ALL
              </Link>
            </div>

            <div className="search-result-artist">
              {newReleases?.albums?.items?.map((item) => (
                <div
                  onClick={() =>
                    navigate(`/albums/${item?.uri?.split(":")[2]}`)
                  }
                  className="search-link"
                >
                  <div
                    className="artist-card"
                    onClick={(e) => playPlaylist(e, item)}
                    onMouseOver={() => {
                      setShow(item.uri);
                    }}
                    onMouseLeave={() => {
                      setShow();
                    }}
                  >
                    <div className="card-inner">
                      <img
                        src={item?.images[0]?.url}
                        alt="artist"
                        className="playlist-image"
                      />
                      {show === item.uri && (
                        <PlayIcon
                          width="40"
                          height="40"
                          playPlaylist={() => playPlaylist(item)}
                        />
                      )}
                    </div>
                    <div className="card-outer">
                      <p className="mt-2">
                        {item.name?.length > 15
                          ? item.name?.substring(0, 15) + "..."
                          : item.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="result-head">
              <h2 className="head text-white">Featured</h2>
              <Link to="/" className="see-all">
                SEE ALL
              </Link>
            </div>
            <div className="search-result-artist">
              {featured?.playlists?.items?.map((item) => (
                <Link
                  to={`/playlist/${item?.uri?.split(":")[2]}`}
                  className="search-link"
                >
                  <div
                    className="artist-card"
                    onClick={() => playPlaylist(item)}
                    onMouseOver={() => {
                      setShow(item.uri);
                    }}
                    onMouseLeave={() => {
                      setShow();
                    }}
                  >
                    <div className="card-inner">
                      <img
                        src={item?.images[0]?.url}
                        alt="artist"
                        className="playlist-image"
                      />
                      {show === item.uri && (
                        <PlayIcon
                          width="40"
                          height="40"
                          playPlaylist={() => playPlaylist(item)}
                        />
                      )}
                    </div>
                    <div className="card-outer">
                      <p className="mt-1">
                        {item.name?.length > 15
                          ? item.name?.substring(0, 15) + "..."
                          : item.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
