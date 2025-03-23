const mongoose = require("mongoose");
const { EMAIL_REGEX, PHONE_REGEX } = require("../constant/regex");
const { INVALID_EMAIL, INVALID_PHONE } = require("../constant/message");

const ResumeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, INVALID_EMAIL],
    },
    number: {
      type: String,
      required: true,
      match: [PHONE_REGEX, INVALID_PHONE],
    },
    skills: {
      type: [String],
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    projects: {
      type: [String],
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    experience: {
      type: [String],
      required: true,
    },
    education: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", ResumeSchema);

module.exports = Resume;
