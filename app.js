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

app.listen(8888, () => {
  console.log("Server started on http://localhost:8888");
});
