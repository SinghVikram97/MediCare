const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Working");
});

app.post("/", (req, res) => {
  PythonShell.run("model.py", {}, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log("Server started on http://localhost:8888");
});
