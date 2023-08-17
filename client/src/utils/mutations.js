import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SESSION = gql`
  mutation addSession($sessionText: String!) {
    addSession(sessionText: $sessionText) {
      _id
      sessionText
      sessionAuthor
      createdAt
      workouts {
        _id
        workoutText
      }
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation addWorkout(
    $sessionId: ID!
    $workoutText: String!
    $workoutType: String!
  ) {
    addWorkout(
      sessionId: $sessionId
      workoutText: $workoutText
      workoutType: $workoutType
    ) {
      _id
      sessionText
      sessionAuthor
      createdAt
      workouts {
        _id
        workoutText
        workoutType
        createdAt
      }
    }
  }
`;
