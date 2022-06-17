import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  searchArtists,
  searchPlaylists,
  searchTracks,
} from "../services/spotifyFunctions";
import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";
import { useDataLayerValue } from "../context/DataLayer";
import "../styles/SearchAll.css";
import TrackSearchResult from "./TrackSearchResult";
import PlayIcon from "./PlayIcon";
const SearchAll = () => {
  const [{}, dispatch] = useDataLayerValue();
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
    dispatch({
      type: "SET_PLAYING_TRACK",
      playingTrack: id,
    });
  };

  function chooseTrack(track) {
    dispatch({
      type: "SET_PLAYING_TRACK",
      playingTrack: track,
    });
    // setSearch("");
    // setLyrics("");
  }
  return (
    <div className="search">
      <div className="search-results">
        {artists?.length > 0 && (
          <>
            <div className="result-head">
              <h2 className="head">Artists</h2>
            </div>
            <div className="search-result-artist">
              {artists?.map((artist) => (
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
                    <p>{artist.name}</p>
                    <p className="light">Artist</p>
                  </div>
                </div>
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
                    <p>{playlist.name}</p>
                    <p className="light">By {playlist?.owner?.display_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {songs?.length > 0 && (
          <>
            <div className="result-head">
              <h2 className="head">Playlists</h2>
            </div>
            {songs?.map((item) => (
              <TrackSearchResult
                track={item}
                key={item?.uri}
                chooseTrack={() => chooseTrack(item)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchAll;
