import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";

import { QUERY_SINGLE_SESSION } from "../utils/queries";

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
      <div className="session-header bg-dark text-light p-3">
        <h3 className="session-author">
          {session.sessionAuthor} <br />
          <span className="session-created-at">
            Created session at {session.createdAt}
          </span>
        </h3>
      </div>
      <div className="session-content bg-white py-4">
        <blockquote className="session-text p-4">
          <span className="session-text-bg">{session.sessionText}</span>
        </blockquote>
      </div>

      <div className="workout-list-container mt-5">
        <WorkoutList workouts={session.workouts} />
      </div>
      <div className="workout-form-container mt-3 mb-5">
        <WorkoutForm sessionId={session._id} />
      </div>
    </div>
  );
};

export default SingleSession;
