import React from "react";
import "./_header.scss";
import { FaBars } from "react-icons/fa";
import { MdNotifications, MdApps } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

const Header = ({ handleToggleSidebar }) => {
  return (
    <div className=" header">
      <FaBars
        onClick={() => handleToggleSidebar()}
        className="header_menu"
        size={26}
      />
      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt="logo"
        className="header_logo"
      />
      <form>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header_icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Header;
