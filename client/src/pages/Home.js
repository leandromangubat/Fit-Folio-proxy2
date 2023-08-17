import React from "react";
import { useQuery } from "@apollo/client";

import SessionList from "../components/SessionList";
import SessionForm from "../components/SessionForm";

import { QUERY_SESSIONS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_SESSIONS);
  const sessions = data?.sessions || [];
  // comment //
  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <SessionForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <SessionList sessions={sessions} title="Your Sessions" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
