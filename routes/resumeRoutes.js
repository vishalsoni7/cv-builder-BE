const express = require("express");
const resumeRouter = express.Router();

// Importing resume controller functions
const {
  createResume,
  deleteResume,
  updateResume,
  getResumesByUserId,
  getResumeById,
} = require("../controllers/resumeController");
const {
  USER_ID_MISSING,
  RESUME_UPDATE_SUCCESS,
} = require("../constant/message");

// Middleware to parse JSON requests
resumeRouter.use(express.json());

/**
 * @route   POST /
 * @desc    Create a new resume
 * @access  Public
 */
resumeRouter.post("/", async (req, res) => {
  try {
    const response = await createResume(req);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /
 * @desc    Fetch all resumes
 * @access  Public
 */
resumeRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: USER_ID_MISSING });
    }

    const resumes = await getResumesByUserId(userId);

    res.status(200).json(resumes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resumes", error: error.message });
  }
});

/**
 * @route   GET /:id
 * @desc    Fetch a single resume by ID
 * @access  Public
 */
resumeRouter.get("/:id", async (req, res) => {
  try {
    const resume = await getResumeById(req.params.id);
    res.status(200).json(resume);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @route   PUT /:id
 * @desc    Update a resume by ID
 * @access  Public
 */
resumeRouter.put("/:id", async (req, res) => {
  try {
    const updatedResume = await updateResume(req.params.id, req.body);
    res
      .status(200)
      .json({ message: RESUME_UPDATE_SUCCESS, resume: updatedResume });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @route   DELETE /:id
 * @desc    Delete a resume by ID
 * @access  Public
 */
resumeRouter.delete("/:id", async (req, res) => {
  try {
    const response = await deleteResume(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Exporting the router module
module.exports = { resumeRouter };
