import React from "react";
import "./addUser.css";
const AddUser = () => {
  return (
    <div className="addUser">
      <form>
        <input type="text" name="username" placeholder="username" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="details">
          <img src="/public/avatar.png" alt="profile" />
          <span>israel</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
};

export default AddUser;
