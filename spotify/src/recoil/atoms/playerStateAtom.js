import { atom } from "recoil";

export const playerState = atom({
  key: "playerState",
  default: {
    playing: false,
    playingTrack: null,
  },
});
