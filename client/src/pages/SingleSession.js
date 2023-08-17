import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";

import { QUERY_SINGLE_SESSION } from "../utils/queries";
import "../index.css";

const SingleSession = () => {
  const { sessionId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_SESSION, {
    variables: { sessionId: sessionId },
  });

  const session = data?.session || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-session-container">
      <div className="session-header">
        <h3 className="session-author">{session.sessionAuthor}</h3>
        <span className="session-created-at">
          Created session at {session.createdAt}
        </span>
      </div>
      <div className="session-content">
        <blockquote className="session-text">{session.sessionText}</blockquote>
      </div>

      <div className="workout-list-container">
        <WorkoutList workouts={session.workouts} />
      </div>
      <div className="workout-form-container">
        <WorkoutForm sessionId={session._id} />
      </div>
    </div>
  );
};

export default SingleSession;
