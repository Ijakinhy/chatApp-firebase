import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import Nav from "../component/Nav";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1> Uh oh! we've got a problem</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn--dark"
        >
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link to="/" className="btn btn--dark" onClick={() => navigate("/")}>
          <HomeIcon width={20} />
          <span> Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
