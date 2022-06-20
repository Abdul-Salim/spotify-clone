import { atom } from "recoil";

export const allPlaylists = atom({
  key: "playlistState",
  default: {
    playlist: [],
  },
});
