import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import WorkoutList from "../components/WorkoutList";
import WorkoutForm from "../components/WorkoutForm";

import { QUERY_SINGLE_SESSION } from "../utils/queries";

const SingleSession = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { sessionId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_SESSION, {
    // pass URL parameter
    variables: { sessionId: sessionId },
  });

  const session = data?.session || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {session.sessionAuthor} <br />
        <span style={{ fontSize: "2rem" }}>
          created session at {session.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: "1.5rem",
            lineHeight: "1.5",
          }}
        >
          <span className=" p-2 bg-primary">{session.sessionText}</span>
        </blockquote>
      </div>

      <div className="my-5">
        <WorkoutList workouts={session.workouts} />
      </div>
      <div className="m-3 p-4">
        <WorkoutForm sessionId={session._id} />
      </div>
    </div>
  );
};

export default SingleSession;
