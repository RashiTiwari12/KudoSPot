const express = require("express");
require("dotenv").config();
const path = require("path");
const userRoute = require("./routes/user.routes");
const kudosRoute = require("./routes/kudos.routes");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")));

app.use("/login", userRoute);
app.use("/kudos", kudosRoute);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
