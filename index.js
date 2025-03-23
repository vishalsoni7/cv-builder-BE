const express = require("express");
const app = express();
const cors = require("cors");
const connectToDatabase = require("./config/db");
const { userRouter } = require("./routes/authRoutes");
const { resumeRouter } = require("./routes/resumeRoutes");

require("dotenv").config();

const PORT = process.env.PORT;

connectToDatabase();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (_, res) => {
  res.send("Backend");
});

app.use("/", userRouter);
app.use("/resume", resumeRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
