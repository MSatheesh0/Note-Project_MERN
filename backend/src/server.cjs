const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const newRoutes = require("./routes/newRoutes");
const connectDB = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();
const app = express();



if (process.env.node_env !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

const port = 3000;

app.use("/api/node", newRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/dist/index.html")
  );
});
}

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("server stated successfully " + port);
    });
  })
  .catch((error) => {
    console.log("Fail to connect the db ", error);
  });