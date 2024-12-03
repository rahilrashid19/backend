const express = require("express");
const { connectDB } = require("./config/databaseConfig");
const { authRouter } = require("./routes/authRouter");
const { userRouter } = require("./routes/userRouter");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());
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
