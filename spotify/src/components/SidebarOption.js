import React from "react";

import "../styles/SidebarOption.css";
import { NavLink } from "react-router-dom";

function SidebarOption({ title, Icon, id, key }) {
  return (
    <div className="sidebarOption" key={key}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h4>{title}</h4>
      ) : (
        <NavLink to={`/playlist/${id}`} activeClassName="playlist-active">
          <p className="playlist-title">{title}</p>{" "}
        </NavLink>
      )}
    </div>
  );
}

export default SidebarOption;
