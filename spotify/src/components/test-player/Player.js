import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Next from "../../assets/next-icon";
import Previous from "../../assets/previous-icon";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

import { playerState } from "../../recoil/atoms/playerStateAtom";
import spotifyAPI from "../../spotify";
import Volume from "../../assets/volume-icon";
import { LinearProgress, Slider } from "@mui/material";
import Play from "../../assets/play-icon";
import Pause from "../../assets/pause-icons";

const SpotifyPlayer = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [playerStateVal, setPlayerState] = useRecoilState(playerState);

  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    console.log(playerStateVal);
  }, [playerStateVal]);

  const fetchCurrentSong = () => {
    spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
      setPlayerState({
        ...playerStateVal,
        playingTrack: data?.body?.item,
        playlisturi: data?.body?.external_urls?.uri,
      });
    });

    spotifyAPI.getMyCurrentPlaybackState().then((data) => {
      setPlayerState({
        ...playerStateVal,
        playing: data?.body?.is_playing,
        progress: data?.body?.progress_ms,
      });
    });
  };
  const [player, setPlayer] = useState(undefined);

  const handleVolume = () => {
    spotifyAPI.setVolume(volume);
  };

  // useEffect(() => {
  //   let availableDevices;
  //   spotifyAPI.setAccessToken(accessToken);
  //   spotifyAPI
  //     .getMyDevices()
  //     .then((data) => {
  //       availableDevices = data.body.devices.filter(
  //         (device) => device?.name === "Spotify-clone-player"
  //       );
  //       console.log(availableDevices);
  //       spotifyAPI
  //         .transferMyPlayback(availableDevices[0])
  //         .then(() => {
  //           console.log("Transfering playback to " + availableDevices);
  //         })
  //         .catch((err) => {
  //           console.log("Something went wrong!", err);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log("Something went wrong!", err);
  //     });
  //   if (!playerStateVal?.playingTrack) {
  //     fetchCurrentSong();
  //     setVolume(50);
  //   }
  // }, []);

  useEffect(() => {
    console.log("hi");
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spotify-clone-player",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);
      player.addListener("ready", ({ device_id }) => {
        spotifyAPI.setAccessToken(accessToken);

        let availableDevices;
        spotifyAPI.setAccessToken(accessToken);
        spotifyAPI
          .getMyDevices()
          .then((data) => {
            availableDevices = data.body.devices.filter(
              (device) => device?.name === "Spotify-clone-player"
            );
            spotifyAPI
              .transferMyPlayback([availableDevices[0]?.id])
              .then(() => {})
              .catch((err) => {});
          })
          .catch((err) => {});
      });

      player.addListener("not_ready", ({ device_id }) => {});
      player.connect();
    };
  }, []);

  useEffect(() => {
    console.log("first");
    if (player && !playerStateVal?.playingTrack) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [player]);

  const handlePlayPause = () => {
    spotifyAPI.setAccessToken(accessToken);
    spotifyAPI.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyAPI.pause();
        setPlayerState({
          ...playerStateVal,
          playing: false,
          progress: data?.body?.progress_ms,
        });
      } else {
        spotifyAPI.play();
        setPlayerState({
          ...playerStateVal,
          playing: true,
          progress: data?.body?.progress_ms,
        });
      }
    });
  };

  const next = () => {
    spotifyAPI.skipToNext();
  };

  const previous = () => {
    spotifyAPI.skipToPrevious();
  };

  // useEffect(() => {
  //   if (playerStateVal?.playing) {
  //     const duration = playerStateVal?.playingTrack?.duration_ms;
  //     let x = duration / 100;
  //     setStep(x * 1000);
  //     const interval = setInterval(() => {
  //       setProgress((prev) => prev + step);
  //     }, 1000);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [playerStateVal?.playing]);

  return (
    <div className="footer-player">
      <div className="d-flex footer-left">
        <img
          src={playerStateVal?.playingTrack?.album?.images?.[0]?.url}
          width={64}
          height={64}
          alt=""
        />
        <div className="d-flex flex-column justify-content-center px-2">
          <h3 className="track-name">{playerStateVal?.playingTrack?.name}</h3>
          <p className="artist-name">
            {playerStateVal?.playingTrack?.artists?.[0]?.name}
          </p>
        </div>
      </div>
      <div className="footer-center">
        <div className="d-flex w-100 justify-content-center align-items-center">
          <Previous onClick={previous} />
          {playerStateVal?.playing ? (
            <Pause onClick={handlePlayPause} />
          ) : (
            <Play onClick={handlePlayPause} />
          )}
          <Next onClick={next} />
        </div>
        <div className="px-5 mt-2">
          <LinearProgress variant="determinate" value={progress} />
        </div>
      </div>
      <div className="d-flex footer-right">
        <Volume />
        <Slider
          size="small"
          aria-label="Volume"
          defaultValue={70}
          value={volume}
          onChangeCommitted={handleVolume}
          onChange={(e) => setVolume(e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default SpotifyPlayer;
