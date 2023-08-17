import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";
import logoImage from "../../assets/logo.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const headerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Set the background color to lightcyan
    color: "black", // Set the text color to black for better contrast
    height: "130px",
  };

  return (
    <header style={headerStyle} className="mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className="logo-container">
          <Link className="text-light" to="/">
            <img src={logoImage} alt="Logo" className="logo" />
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
