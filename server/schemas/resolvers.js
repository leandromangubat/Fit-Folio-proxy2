const { AuthenticationError } = require("apollo-server-express");
const { User, Session } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("sessions");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("sessions");
    },
    sessions: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Session.find(params).sort({ createdAt: -1 });
    },
    session: async (parent, { sessionId }) => {
      return Session.findOne({ _id: sessionId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("sessions");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addSession: async (parent, { sessionText }, context) => {
      if (context.user) {
        const session = await Session.create({
          sessionText,
          sessionAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { sessions: session._id } }
        );

        return session;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addWorkout: async (
      parent,
      { sessionId, workoutText, workoutType, workoutDistance },
      context
    ) => {
      if (context.user) {
        return Session.findOneAndUpdate(
          { _id: sessionId },
          {
            $addToSet: {
              workouts: {
                workoutType,
                workoutText,
                workoutDistance,
                workoutAuthor: context.user.username,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeSession: async (parent, { sessionId }, context) => {
      if (context.user) {
        const session = await Session.findOneAndDelete({
          _id: sessionId,
          sessionAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { sessions: session._id } }
        );

        return session;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeWorkout: async (parent, { sessionId, workoutId }, context) => {
      if (context.user) {
        return Session.findOneAndUpdate(
          { _id: sessionId },
          {
            $pull: {
              workouts: {
                _id: workoutId,
                workoutAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
