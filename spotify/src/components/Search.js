import React, { useState, useEffect } from "react";

// import { Avatar } from "@material-ui/core";
import PlayCircleFilledWhiteSharpIcon from "@mui/icons-material/PlayCircleFilledWhiteSharp";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import TrackSearchResult from "./TrackSearchResult";
import { useDataLayerValue } from "../context/DataLayer";

import "../styles/Search.css";
import { useNavigate, Link } from "react-router-dom";
import spotifyApi from "../spotify";

import CircularProgress from "@mui/material/CircularProgress";
import CategoryItem from "./CategoryItem";
import randomColor from "randomcolor";
import SpotifyFunctions from "./spotifyFunctions.";
import {
  searchPlaylists,
  searchTracks,
  searchArtists,
  getCategories,
  searchAlbums,
} from "../services/spotifyFunctions";
import SongRow from "./SongRow";
import Albums from "./Albums";
import PlayIcon from "./PlayIcon";

const Header = () => {
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState();
  const [categories, setCategories] = useState([]);
  const color = randomColor();
  // const [lyrics, setLyrics] = useState("");
  const [
    { accessToken, search, playingTrack, playing },
    dispatch,
  ] = useDataLayerValue();
  const [songs, setSongs] = useState();
  const [show, setShow] = useState();
  const [albums, setAlbums] = useState();
  const [artists, setArtist] = useState();
  const [searchPlaylist, setSearchPlaylist] = useState();
  const [loading, setLoading] = useState(false);
  // const [show, handleShow] = useState(false);

  const navigate = useNavigate();
  var div = document.getElementById("myDiv");

  useEffect(() => {
    div?.addEventListener("scroll", () => {
      if (div?.scrollTop > 10) {
        dispatch({
          type: "SET_BLACK",
          value: true,
        });
      } else
        dispatch({
          type: "SET_BLACK",
          value: false,
        });
    });
    return () => {
      div?.removeEventListener("scroll", null);
    };
  }, [dispatch, div]);

  const playPlaylist = (id) => {
    dispatch({
      type: "SET_PLAYING_TRACK",
      playingTrack: id,
    });
  };

  const seeall = (type) => {
    if (type === "artist") {
      spotifyApi
        ?.searchArtists(search, { limit: 50 })
        .then((data) => {
          setArtist(
            data.body.artists.items.map((artist) => {
              const smallestArtistImage = artist?.images.reduce(
                (smallest, image) => {
                  if (image.height > smallest.height) return image;
                  return smallest;
                },
                artist.images[0]
              );
              return {
                name: artist.name,
                uri: artist.uri,
                image: smallestArtistImage?.url,
              };
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (type === "playlist") {
      spotifyApi
        .searchPlaylists(search, { limit: 50 })
        .then((data) => {
          setSearchPlaylist(
            data.body.playlists.items.map((playlist) => {
              const smallestPlaylistImage = playlist?.images.reduce(
                (smallest, image) => {
                  if (image.height > smallest.height) return image;
                  return smallest;
                },
                playlist.images[0]
              );

              return {
                name: playlist.name,
                uri: playlist.uri,
                image: smallestPlaylistImage.url,
                owner: playlist.owner,
              };
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (type === "song") {
      spotifyApi.searchTracks(search, { limit: 50 }).then((res) => {
        setSongs(
          res.body.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      });
    }
  };

  useEffect(() => {
    if (search?.length <= 0) {
      setSongs();
      setArtist();
      setSearchPlaylist();
      return;
    }
    // if (!accessToken) return;
    console.log("slslslsls", search, accessToken);

    setLoading(true);
    searchTracks({ keyword: search, limit: 4 })
      .then((res) => {
        setSongs(res?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

    searchPlaylists({ keyword: search, limit: 6 })
      .then((res) => {
        console.log("res", res);
        setSearchPlaylist(res?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    searchArtists({ keyword: search, limit: 6 })
      .then((res) => {
        setArtist(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
    searchAlbums({ keyword: search, limit: 6 })
      .then((res) => {
        console.log(res);
        setAlbums(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
    // spotifyApi?.searchTracks(search, { limit: 6 }).then((res) => {
    //   setSongs(
    //     res.body.tracks.items.map((track) => {
    //       const smallestAlbumImage = track.album.images.reduce(
    //         (smallest, image) => {
    //           if (image.height < smallest.height) return image;
    //           return smallest;
    //         },
    //         track.album.images[0]
    //       );

    //       return {
    //         artist: track.artists[0].name,
    //         title: track.name,
    //         uri: track.uri,
    //         albumUrl: smallestAlbumImage.url,
    //       };
    //     })
    //   );
    // });
    // spotify
    //   ?.searchArtists(search, { limit: 6 })
    //   .then((data) => {
    //     setArtist(
    //       data.body.artists.items.map((artist) => {
    //         const smallestArtistImage = artist?.images.reduce(
    //           (smallest, image) => {
    //             if (image.height > smallest.height) return image;
    //             return smallest;
    //           },
    //           artist.images[0]
    //         );
    //         return {
    //           name: artist.name,
    //           uri: artist.uri,
    //           image: smallestArtistImage?.url,
    //         };
    //       })
    //     );
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    // spotify
    //   ?.searchPlaylists(search, { limit: 6 })
    //   .then((data) => {
    //     setLoading(false);
    //     setSearchPlaylist(
    //       data.body.playlists.items.map((playlist) => {
    //         const smallestPlaylistImage = playlist?.images.reduce(
    //           (smallest, image) => {
    //             if (image.height > smallest.height) return image;
    //             return smallest;
    //           },
    //           playlist.images[0]
    //         );

    //         return {
    //           name: playlist.name,
    //           uri: playlist.uri,
    //           image: smallestPlaylistImage.url,
    //           owner: playlist.owner,
    //         };
    //       })
    //     );
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, [accessToken, search]);

  useEffect(() => {
    getCategories({ country: "IN", offset: 0, limit: 50 })
      .then((res) => {
        setCategories(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  function chooseTrack(track) {
    if (playingTrack === track && playing === true) {
      dispatch({
        type: "SET_PLAYING_TRACK",
        playingTrack: null,
        isPlaying: false,
      });
    } else {
      dispatch({
        type: "SET_PLAYING_TRACK",
        playingTrack: track,
      });
    }
    // setSearch("");
    // setLyrics("");
  }

  return (
    <div className="search" id="myDiv">
      {/* <div className="search-top"></div> */}
      {search.length > 0 ? (
        <>
          {!loading ? (
            <>
              <div className="search-results">
                {songs?.length > 0 && (
                  <>
                    <div className="result-head">
                      <h2 className="head">Songs</h2>
                      <Link to={`/search/songs/${search}`} className="see-all">
                        SEE ALL
                      </Link>
                    </div>
                    {songs?.map((item, index) => (
                      // <SongRow
                      //   playSong={() => chooseTrack(item.track)}
                      //   track={item.track}
                      //   index={index}
                      //   key={item?.id}
                      // />
                      <TrackSearchResult
                        track={item}
                        key={item?.uri}
                        index={index}
                        chooseTrack={() => chooseTrack(item)}
                        seeall={() => seeall(songs)}
                      />
                    ))}
                  </>
                )}
                <div className="result-head">
                  <h2 className="head">Artists</h2>
                  <Link to={`/search/artists/${search}`} className="see-all">
                    SEE ALL
                  </Link>
                </div>
                <div className="search-result-artist">
                  {artists?.map((artist) => (
                    <Link to={`/artist/${artist.uri.split(":")[2]}`}>
                      <div
                        className="artist-card"
                        onClick={() => console.log("pppp", artist)}
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
                          )}
                        </div>
                        <div className="card-outer">
                          <p className="dark">{artist.name}</p>
                          <p className="light">Artist</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* </div> */}
                <div>
                  <div className="result-head">
                    <h2 className="head">Playlists</h2>
                    <Link
                      to={`/search/playlists/${search}`}
                      className="see-all"
                    >
                      SEE ALL
                    </Link>
                  </div>
                  {searchPlaylist?.length <= 6 && (
                    <div className="search-result-artist">
                      {searchPlaylist?.map((playlist) => (
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
                              )}{" "}
                            </div>
                            <div className="card-outer">
                              <p className="dark">{playlist.name}</p>
                              <p className="light">
                                By {playlist?.owner?.display_name}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <div className="result-head">
                  <h2 className="head">Albums</h2>
                  <Link to={`/search/albums/${search}`} className="see-all">
                    SEE ALL
                  </Link>
                </div>
                <div className="search-result-artist">
                  {albums?.map((album) => (
                    <Albums
                      album={album}
                      playPlaylist={(album) => playPlaylist(album)}
                      show={show}
                      setShow={() => setShow()}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="categories-head">Browse all</h1>
          <div className="categories">
            {categories?.map((item) => (
              <CategoryItem item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
