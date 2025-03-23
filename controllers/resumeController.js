const {
  USER_ID_MISSING,
  RESUME_CREATED_SUCCESS,
  USER_NOT_FOUND,
  RESUME_NOT_FOUND,
  RESUME_DELETED_SUCCESS,
} = require("../constant/message");
const Resume = require("../models/Resume");
const User = require("../models/User");

/**
 * createResume - Creates a new resume document and associates it with a user
 */
const createResume = async (req) => {
  try {
    const userId = req.body.user;
    if (!userId) throw new Error(USER_ID_MISSING);

    const newResume = new Resume({ ...req.body, user: userId });
    await newResume.save();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { resumes: newResume._id } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) throw new Error(USER_NOT_FOUND);

    return { message: RESUME_CREATED_SUCCESS, resume: newResume };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * getResumesByUserId - Retrieves all resumes belonging to a specific user
 */
const getResumesByUserId = async (userId) => {
  try {
    const resumes = await Resume.find({ user: userId });
    return resumes;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * getResumeById - Retrieves a single resume document by its ID
 */
const getResumeById = async (resumeId) => {
  const resume = await Resume.findById(resumeId);
  if (!resume) {
    throw new Error(RESUME_NOT_FOUND);
  }

  return resume;
};

/**
 * updateResume - Updates an existing resume document with new information
 */
const updateResume = async (resumeId, updateData) => {
  const updatedResume = await Resume.findByIdAndUpdate(resumeId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedResume) {
    throw new Error(RESUME_NOT_FOUND);
  }

  return updatedResume;
};

/**
 * deleteResume - Removes a resume document from the database
 */
const deleteResume = async (resumeId) => {
  const deletedResume = await Resume.findByIdAndDelete(resumeId);

  if (!deletedResume) {
    throw new Error(RESUME_NOT_FOUND);
  }

  return { message: RESUME_DELETED_SUCCESS };
};

module.exports = {
  createResume,
  getResumesByUserId,
  getResumeById,
  updateResume,
  deleteResume,
};
