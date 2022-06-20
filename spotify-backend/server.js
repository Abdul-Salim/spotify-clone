require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const spotify = new SpotifyWebApi();

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "No Lyrics Found";
  res.json({ lyrics });
});

app.get("/playlists", async (req, res) => {
  const accessToken = req.headers.authorization;
  spotify.setAccessToken(accessToken);
  spotify
    .getUserPlaylists()
    .then((response) => {
      return res.json(response.body);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/playlist", async (req, res) => {
  const accessToken = req.headers.authorization;
  const { id } = req.query;
  spotify.setAccessToken(accessToken);
  spotify
    .getPlaylist(id)
    .then((response) => {
      const result = response.body;
      result.primary_color = Math.random().toString(16).substr(-6);
      return res.json(result);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/me", async (req, res) => {
  const accessToken = req.headers.authorization;
  spotify.setAccessToken(accessToken);
  spotify
    .getMe()
    .then((response) => {
      return res.json(response.body);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/search-artists", async (req, res) => {
  const accessToken = req.headers.authorization;
  const { keyword, limit } = req.query;
  spotify.setAccessToken(accessToken);
  spotify
    .searchArtists(keyword, { limit: limit })
    .then((data) => {
      const artists = data.body.artists.items.map((artist) => {
        const smallestArtistImage = artist.images.reduce((smallest, image) => {
          if (image.height > smallest.height) return image;
          return smallest;
        }, artist.images[0]);
        return {
          name: artist.name,
          uri: artist.uri,
          image: smallestArtistImage ? smallestArtistImage.url : null,
          id: artist.id,
        };
      });
      return res.json(artists);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/search-tracks", async (req, res) => {
  const accessToken = req.headers.authorization;
  const { keyword, limit } = req.query;
  spotify.setAccessToken(accessToken);
  spotify
    .searchTracks(keyword, { limit: limit })
    .then((data) => {
      const tracks = data.body.tracks.items.map((track) => {
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
          id: track.id,
        };
      });
      return res.json(tracks);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/search-playlists", async (req, res) => {
  const accessToken = req.headers.authorization;
  const { keyword, limit } = req.query;
  spotify.setAccessToken(accessToken);
  spotify
    .searchPlaylists(keyword, { limit: limit })
    .then((data) => {
      const playlists = data.body.playlists.items.map((playlist) => {
        const largestPlaylistImage = playlist.images.reduce(
          (largest, image) => {
            if (image.height > largest.height) return image;
            return largest;
          },
          playlist.images[0]
        );

        return {
          name: playlist.name,
          uri: playlist.uri,
          image: largestPlaylistImage.url,
          owner: playlist.owner,
          id: playlist.id,
        };
      });
      return res.json(playlists);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/search-albums", async (req, res) => {
  const accessToken = req.headers.authorization;
  const { keyword, limit } = req.query;
  spotify.setAccessToken(accessToken);
  spotify
    .searchAlbums(keyword, { limit: limit })
    .then((data) => {
      const albums = data.body.albums.items.map((album) => {
        const largestAlbumImage = album.images.reduce((largest, image) => {
          if (image.height > largest.height) return image;
          return largest;
        }, album.images[0]);

        return {
          artist: album.artists[0].name,
          title: album.name,
          uri: album.uri,
          albumUrl: largestAlbumImage.url,
          id: album.id,
        };
      });
      return res.json(albums);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/categories", async (req, res) => {
  const accessToken = req.headers.authorization;
  const { limit, offset, country } = req.query;
  spotify.setAccessToken(accessToken);
  spotify
    .getCategories({
      limit: limit,
      offset: offset,
      country: country,
    })
    .then((data) => {
      const categories = data.body.categories.items.map((item) => ({
        ...item,
        color: Math.random().toString(16).substr(-6),
      }));
      return res.json(categories);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.listen(4000);
