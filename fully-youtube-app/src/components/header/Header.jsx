import React from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import "./_header.scss";
const Header = ({ handleSidebar }) => {
  return (
    <div className="border border-dark header">
      <FaBars
        className="header_menu"
        size={26}
        onClick={() => handleSidebar()}
      />
      <img
        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
        alt="logo"
        className="header_logo"
      />
      <form>
        <input type="text" placeholder="search.... " />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header_icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt="account"
        />
      </div>
    </div>
  );
};

export default Header;
