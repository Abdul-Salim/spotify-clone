import { request } from "../helpers/api";

export const login = (params) =>
  request({
    method: "POST",
    url: "/api/login",
    params,
  });

export const getPlaylists = () =>
  request({
    method: "GET",
    url: "/playlists",
  });

export const getPlaylist = (params) =>
  request({
    method: "GET",
    url: "/playlist",
    params,
  });

export const getMe = () =>
  request({
    method: "GET",
    url: "/me",
  });

export const searchTracks = (params) =>
  request({
    method: "GET",
    url: "/search-tracks",
    params,
  });

export const searchArtists = (params) =>
  request({
    method: "GET",
    url: "/search-artists",
    params,
  });

export const searchPlaylists = (params) =>
  request({
    method: "GET",
    url: "/search-playlists",
    params,
  });

export const searchAlbums = (params) =>
  request({
    method: "GET",
    url: "/search-albums",
    params,
  });

export const getCategories = (params) =>
  request({
    method: "GET",
    url: "/categories",
    params,
  });
