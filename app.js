const connectDb = require("./db/connect");
const express = require("express");
const app = express();
const port = 3000;
const tasks = require("./routes/tasks");
const notFound = require("./middlware/notFound");
const errorHandler = require("./middlware/errorHandler");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`server running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
