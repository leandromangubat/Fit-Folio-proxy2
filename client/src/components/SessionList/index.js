import React from "react";
import { Link } from "react-router-dom";

const SessionList = ({
  sessions,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!sessions.length) {
    return <h3>No Sessions Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {sessions &&
        sessions.map((session) => (
          <div key={session._id} className="card mb-3">
            <h4 className="card-header orange text-light p-2 m-0 ">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${session.sessionAuthor}`}
                >
                  {session.sessionAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    created session on {session.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    Session created on {session.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body orange p-2">
              <p>{session.sessionText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/sessions/${session._id}`}
            >
              Add workouts to this Session!
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SessionList;
