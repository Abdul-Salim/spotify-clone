import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  searchArtists,
  searchPlaylists,
  searchTracks,
} from "../services/spotifyFunctions";
import "../styles/SearchAll.css";
import TrackSearchResult from "./TrackSearchResult";
import PlayIcon from "./PlayIcon";
import { playerState } from "../recoil/atoms/playerStateAtom";
import { headerState } from "../recoil/atoms/headerStateAtom";
import { Link } from "react-router-dom";
const SearchAll = () => {
  const ref = useRef();

  const [playerStateVal, setPlayerState] = useRecoilState(playerState);
  const [headerStateVal, setHeaderState] = useRecoilState(headerState);
  //   const keyword = path?.slice(3);
  const [show, setShow] = useState();
  const [songs, setSongs] = useState();
  const [artists, setArtist] = useState();
  const [playlists, setPlaylists] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const path = window.location.pathname?.split("/");

    if (path[2] === "artists") {
      searchArtists({ keyword: path[3], limit: 50 })
        .then((res) => {
          console.log("Essssss", res);
          setArtist(res?.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
        });
    }
    if (path[2] === "playlists") {
      searchPlaylists({ keyword: path[3], limit: 50 })
        .then((res) => {
          console.log("playlistssssss", res);
          setPlaylists(res?.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    if (path[2] === "songs") {
      searchTracks({ keyword: path[3], limit: 50 })
        .then((res) => {
          console.log("songssss", res);
          setSongs(res?.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);

  const playPlaylist = (id) => {
    setPlayerState({ ...playerStateVal, playingTrack: id });
  };

  function chooseTrack(track) {
    setPlayerState({ ...playerStateVal, playingTrack: track });
    // setSearch("");
    // setLyrics("");
  }

  const changeNavbarColor = () => {
    if (ref.current.scrollTop >= 80) {
      setHeaderState({ ...headerStateVal, isBlack: true });
    } else {
      setHeaderState({ ...headerStateVal, isBlack: false });
    }
  };

  return (
    <div className="search" ref={ref} onScroll={changeNavbarColor}>
      <div style={{ marginTop: "40px" }}>
        <div className="search-results">
          {artists?.length > 0 && (
            <>
              <div className="result-head">
                <h2 className="head">Artists</h2>
              </div>
              <div className="search-result-artist">
                {artists?.map((artist) => (
                  <Link
                    to={`/artist/${artist?.uri?.split(":")[2]}`}
                    className="search-link"
                  >
                    <div
                      className="artist-card"
                      onMouseOver={() => {
                        setShow(artist.uri);
                      }}
                      onMouseLeave={() => {
                        setShow();
                      }}
                    >
                      <div className="card-inner">
                        <img
                          src={artist.image}
                          alt="artist"
                          className="artist-image"
                        />
                        {show === artist.uri && (
                          <PlayIcon
                            width="40"
                            height="40"
                            playPlaylist={() => playPlaylist(artist)}
                          />
                        )}{" "}
                      </div>
                      <div className="card-outer">
                        <p className="mt-1">
                          {artist.name?.length > 15
                            ? artist.name?.substring(0, 15) + "..."
                            : artist.name}
                        </p>
                        <p className="light">Artist</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          {playlists?.length > 0 && (
            <>
              <div className="result-head">
                <h2 className="head">Playlists</h2>
              </div>
              <div className="search-result-artist">
                {playlists?.map((playlist) => (
                  <Link
                    to={`/playlist/${playlist.uri.split(":")[2]}`}
                    className="search-link"
                  >
                    <div
                      className="artist-card"
                      onClick={() => playPlaylist(playlist)}
                      onMouseOver={() => {
                        setShow(playlist.uri);
                      }}
                      onMouseLeave={() => {
                        setShow();
                      }}
                    >
                      <div className="card-inner">
                        <img
                          src={playlist.image}
                          alt="artist"
                          className="playlist-image"
                        />
                        {show === playlist.uri && (
                          <PlayIcon
                            width="40"
                            height="40"
                            playPlaylist={() => playPlaylist(playlist)}
                          />
                        )}
                      </div>
                      <div className="card-outer">
                        <p className="mt-1">
                          {playlist.name?.length > 15
                            ? playlist.name?.substring(0, 15) + "..."
                            : playlist.name}
                        </p>
                        <p className="light">
                          By {playlist?.owner?.display_name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          {songs?.length > 0 && (
            <>
              <div className="result-head">
                <h2 className="head">Playlists</h2>
              </div>
              {songs?.map((item, index) => (
                <TrackSearchResult
                  track={item}
                  key={item?.uri}
                  chooseTrack={() => chooseTrack(item)}
                  index={index}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAll;
