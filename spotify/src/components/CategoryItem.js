import React from "react";
import { useNavigate } from "react-router-dom";
import spotifyApi from "../spotify";
const CategoryItem = ({ item, setSearchPlaylist }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  //   const color = randomColor();
  const getPlaylists = (id) => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .getPlaylistsForCategory(id, {
          limit: 50,
        })
        .then(
          function (data) {
            console.log(data);
            setSearchPlaylist(data?.body?.playlists?.items);
            navigate(`/search/playlists/${item?.name}`);
          },
          function (err) {
            console.log("Something went wrong!", err);
          }
        );
    }
  };
  return (
    <div>
      <div className="category__item" onClick={() => getPlaylists(item.id)}>
        <div
          className="item-wrapper"
          style={{
            backgroundColor: `#${item?.color}`,
          }}
        >
          <p>{item.name}</p>
          <img src={item.icons[0].url} alt="category" />
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
