const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    sessions: [Session]!
  }

  type Session {
    _id: ID
    sessionText: String
    sessionAuthor: String
    createdAt: String
    workouts: [Workout]!
  }

  type Workout {
    _id: ID
    workoutText: String
    workoutAuthor: String
    workoutType: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    sessions(username: String): [Session]
    session(sessionId: ID!): Session
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSession(sessionText: String!): Session
    addWorkout(
      sessionId: ID!
      workoutText: String!
      workoutType: String!
    ): Session
    removeSession(sessionId: ID!): Session
    removeWorkout(sessionId: ID!, workoutId: ID!): Session
  }
`;

module.exports = typeDefs;
