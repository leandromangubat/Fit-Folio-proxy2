import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      sessions {
        _id
        sessionText
        createdAt
      }
    }
  }
`;

export const QUERY_SESSIONS = gql`
  query getSessions {
    sessions {
      _id
      sessionText
      sessionAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_SESSION = gql`
  query getSingleSession($sessionId: ID!) {
    session(sessionId: $sessionId) {
      _id
      sessionText
      sessionAuthor
      createdAt
      workouts {
        _id
        workoutText
        workoutType
        workoutAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      sessions {
        _id
        sessionText
        sessionAuthor
        createdAt
      }
    }
  }
`;
