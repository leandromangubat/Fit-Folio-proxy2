const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const sessionSchema = new Schema({
  sessionText: {
    type: String,
    required: "You need to leave a thought!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  sessionAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  workouts: [
    {
      // This is the title of the workout
      workoutText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      // This is the creator of the workout
      workoutAuthor: {
        type: String,
        required: true,
      },
      // This is when the workout was created
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
      // The rest of these objects are details about the workout
      workoutType: {
        type: String,
        required: true,
      },
      workoutDistance: {
        type: String,
        required: false,
      },
      duration: {
        type: String,
        required: false,
      },
      sets: {
        type: String,
        required: false,
      },
      reps: {
        type: String,
        required: false,
      },
      restTime: {
        type: String,
        required: false,
      },
      weight: {
        type: String,
        required: false,
      },
    },
  ],
});

const Session = model("Session", sessionSchema);

module.exports = Session;
