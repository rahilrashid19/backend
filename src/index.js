const express = require("express");
const { connectDB } = require("./config/databaseConfig");
const { authRouter } = require("./routes/authRouter");
const { userRouter } = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "15mb" }));
app.use("/", authRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(4400, () => console.log("listening on Port 4400"));
  })
  .catch((error) =>
    console.log("failed to connect to Database", error.message)
  );
