import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_SESSION } from "../../utils/mutations";
import { QUERY_SESSIONS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const SessionForm = () => {
  const [sessionText, setSessionText] = useState("");

  const [addSession, { error }] = useMutation(ADD_SESSION, {
    update(cache, { data: { addSession } }) {
      try {
        const { sessions } = cache.readQuery({ query: QUERY_SESSIONS });

        cache.writeQuery({
          query: QUERY_SESSIONS,
          data: { sessions: [addSession, ...sessions] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, sessions: [...me.sessions, addSession] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addSession({
        variables: {
          sessionText,
          sessionAuthor: Auth.getProfile().data.username,
        },
      });

      setSessionText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "sessionText" && value.length <= 280) {
      setSessionText(value);
    }
  };

  return (
    <div>
      <h3>Workout Session</h3>

      {Auth.loggedIn() ? (
        <>
          <p className={`m-0 ${error ? "text-danger" : ""}`}></p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="sessionText"
                placeholder="Here's a new session"
                value={sessionText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Session
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to create Workout Sessions. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SessionForm;
