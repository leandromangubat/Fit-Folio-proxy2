import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import SessionForm from "../components/SessionForm";
import SessionList from "../components/SessionList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import "../index.css";

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // Navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div className="profile-container">
      <div className="col-12 col-md-10 orange text-dark p-3 mb-5">
        <h2 className="mb-0">
          VIEWING {userParam ? `${user.username}'s` : "YOUR"} PROFILE:
        </h2>
      </div>

      {!userParam && (
        <div className="col-12 col-md-10 p-3 orange border">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Welcome, {user.username}!</h3>
            <SessionForm />
          </div>
          <SessionList
            sessions={user.sessions}
            title={`${user.username}'s Sessions`}
            showTitle={false}
            showUsername={false}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
