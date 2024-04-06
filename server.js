require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3001;
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/videos", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyDW5Hsh46Vm10dY-IvCDLBtpBZaPNi30Q4&part=snippet&type=video&q=${query}&maxResults=15`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});
