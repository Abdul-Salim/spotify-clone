import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import TrackSearchResult from "./TrackSearchResult";

import "../styles/Search.css";
import { Link, useNavigate } from "react-router-dom";
import spotifyApi from "../spotify";

import CircularProgress from "@mui/material/CircularProgress";
import CategoryItem from "./CategoryItem";
import randomColor from "randomcolor";
import {
  searchPlaylists,
  searchTracks,
  searchArtists,
  getCategories,
  searchAlbums,
} from "../services/spotifyFunctions";
import Albums from "./Albums";
import PlayIcon from "./PlayIcon";
import { tokenState } from "../recoil/atoms/userAtom";
import { headerState } from "../recoil/atoms/headerStateAtom";
import { playerState } from "../recoil/atoms/playerStateAtom";
import { allPlaylists } from "../recoil/atoms/playlistStateAtom";

const Header = () => {
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState();
  const ref = useRef();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  // const [lyrics, setLyrics] = useState("");
  const [token] = useRecoilState(tokenState);
  const [headerStateVal, setHeaderState] = useRecoilState(headerState);
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);
  const [playList, setPlayListState] = useRecoilState(allPlaylists);

  const [songs, setSongs] = useState();
  const [show, setShow] = useState();
  const [albums, setAlbums] = useState();
  const [artists, setArtist] = useState();
  const [searchPlaylist, setSearchPlaylist] = useState();
  const [loading, setLoading] = useState(false);

  const playPlaylist = (e, id) => {
    let uris;
    console.log(id);
    e.stopPropagation();
    spotifyApi
      .getArtistAlbums(id?.id)
      .then((data) => {
        console.log("Artist albums", data.body);
      })
      .catch((err) => {
        console.error(err);
      });
    // let availableDevices;

    // spotifyApi.getMyDevices().then(
    //   function (data) {
    //     availableDevices = data.body.devices[0];
    //     spotifyApi.transferMyPlayback([availableDevices]).then(
    //       function () {
    //         console.log("Transfering playback to " + availableDevices);
    //       },
    //       function (err) {
    //         //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    //         console.log("Something went wrong!", err);
    //       }
    //     );
    //     console.log(availableDevices);
    //   },
    //   function (err) {
    //     console.log("Something went wrong!", err);
    //   }
    // );
    // spotifyApi.play({
    //   uris: uris,
    // });
    // setPlayListState({...playList, activePlaylist: })
    // setPlayerState({ ...playerStateVal, playingTrack: id });
  };

  const seeall = (type) => {
    if (type === "artist") {
      spotifyApi
        ?.searchArtists(headerStateVal?.search, { limit: 50 })
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
        .searchPlaylists(headerStateVal?.search, { limit: 50 })
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
      spotifyApi
        .searchTracks(headerStateVal?.search, { limit: 50 })
        .then((res) => {
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
    if (headerStateVal?.search?.length <= 0) {
      setSongs();
      setArtist();
      setSearchPlaylist();
      return;
    }
    setLoading(true);
    searchTracks({ keyword: headerStateVal?.search, limit: 4 })
      .then((res) => {
        setSongs(res?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });

    searchPlaylists({ keyword: headerStateVal?.search, limit: 5 })
      .then((res) => {
        setSearchPlaylist(res?.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    searchArtists({ keyword: headerStateVal?.search, limit: 5 })
      .then((res) => {
        setArtist(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
    searchAlbums({ keyword: headerStateVal?.search, limit: 5 })
      .then((res) => {
        setAlbums(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  }, [token, headerStateVal?.search]);

  useEffect(() => {
    getCategories({ country: "IN", offset: 0, limit: 50 })
      .then((res) => {
        setCategories(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const playSong = (track) => {
    console.log(track);
    if (playerStateVal.playingTrack === track) {
      if (!playerStateVal?.playing) {
        setPlayerState({
          ...playerStateVal,
          playingTrack: track,
          playing: true,
        });
        spotifyApi.play();
      } else {
        spotifyApi.pause();
        setPlayerState({ ...playerStateVal, playing: false });
      }
    } else {
      spotifyApi.play({
        uris: [track?.uri],
      });
      setPlayerState({ ...playerStateVal, playing: true, playingTrack: track });
    }
  };

  const changeNavbarColor = () => {
    if (ref.current.scrollTop >= 80) {
      setHeaderState({ ...headerStateVal, isBlack: true });
    } else {
      setHeaderState({ ...headerStateVal, isBlack: false });
    }
  };

  return (
    <div className="search" id="myDiv" ref={ref} onScroll={changeNavbarColor}>
      <div style={{ marginTop: "80px" }}>
        {/* <div className="search-top"></div> */}
        {headerStateVal?.search.length > 0 ? (
          <>
            {!loading ? (
              <>
                <div className="search-results">
                  {songs?.length > 0 && (
                    <>
                      <div className="result-head">
                        <h2 className="head">Songs</h2>
                        <Link
                          to={`/search/songs/${headerStateVal?.search}`}
                          className="see-all"
                        >
                          SEE ALL
                        </Link>
                      </div>
                      {songs?.map((item, index) => (
                        <TrackSearchResult
                          track={item}
                          key={item?.uri}
                          index={index}
                          chooseTrack={() => playSong(item)}
                          seeall={() => seeall(songs)}
                        />
                      ))}
                    </>
                  )}
                  <div className="result-head">
                    <h2 className="head">Artists</h2>
                    <Link
                      to={`/search/artists/${headerStateVal?.search}`}
                      className="see-all"
                    >
                      SEE ALL
                    </Link>
                  </div>
                  <div className="search-result-artist">
                    {artists?.map((artist) => (
                      <div
                        onClick={() =>
                          navigate(`/artist/${artist.uri.split(":")[2]}`)
                        }
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
                                item={artist}
                                playPlaylist={playPlaylist}
                              />
                            )}
                          </div>
                          <div className="card-outer">
                            <p className="mt-1">
                              {artist.name?.length > 15
                                ? artist.name?.substring(0, 15) + "..."
                                : artist.name}{" "}
                            </p>
                            <p className="light">Artist</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* </div> */}
                  <div>
                    <div className="result-head">
                      <h2 className="head">Playlists</h2>
                      <Link
                        to={`/search/playlists/${headerStateVal?.search}`}
                        className="see-all"
                      >
                        SEE ALL
                      </Link>
                    </div>
                    {searchPlaylist?.length <= 5 && (
                      <div className="search-result-artist">
                        {searchPlaylist?.map((playlist) => (
                          <Link
                            to={`/playlist/${playlist.uri.split(":")[2]}`}
                            className="search-link"
                          >
                            <div
                              className="artist-card"
                              onClick={(e) => playPlaylist(e, playlist)}
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
                                    playPlaylist={(e) =>
                                      playPlaylist(e, playlist)
                                    }
                                  />
                                )}{" "}
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
                    )}
                  </div>
                  <div className="result-head">
                    <h2 className="head">Albums</h2>
                    <Link
                      to={`/search/albums/${headerStateVal?.search}`}
                      className="see-all"
                    >
                      SEE ALL
                    </Link>
                  </div>
                  <div className="search-result-artist">
                    {albums?.map((album) => (
                      <Albums
                        album={album}
                        playPlaylist={(e) => playPlaylist(e, album)}
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
                <CategoryItem
                  item={item}
                  setSearchPlaylist={setSearchPlaylist}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
