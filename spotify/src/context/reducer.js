import SpotifyWebApi from "spotify-web-api-node";

export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  playlist: null,
  top_artists: null,
  playing: false,
  item: null,
  accessToken: "",
  playingTrack: null,
  search: "",
  searchResults: [],
  isSearch: false,
  isAuthenticated: false,
  isBlack: false,
  categories: [],
};

// token:
// "BQD0J27XK0O2YqhkJ7ALgar-Ma4BoEjnqCo6Ps5YDwxR5c8MhzemmNuY3twXaz9uzvWI1MGp_XcuOfMM5yoPjeA5zZahzgRZvATn_OzyDv0nIWwj_g96ehUumWykFQ-fqqdpS-Q1neTkTlyz5JtJLaYvQuTlf2aVv7b_4j3y_oT0SgER-GL6",

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
        isAuthenticated: true,
      };
    case "SET_TOKEN":
      console.log("seetttinf", action.accessToken);
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_PLAYLIST":
      return {
        ...state,
        playlist: action.playlist,
      };

    case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };
    case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };
    case "SET_PLAY":
      return {
        ...state,
        playing: action.isPlaying,
      };
    case "SET_PLAYING_TRACK":
      return {
        ...state,
        playingTrack: action.playingTrack,
        keyword: action.keyword,
        playing: action.isPlaying,
      };
    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };
    case "SET_SEARCH":
      console.log(action.search);
      return {
        ...state,
        search: action.search,
      };
    case "SET_BLACK":
      return {
        ...state,
        isBlack: action.value,
      };
    case "CLEAR":
      return {
        ...state,
        isSearch: false,
      };
    case "SEARCHING":
      return {
        ...state,
        isSearch: true,
      };
    default:
      return state;
  }
};
export default reducer;
