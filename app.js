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
  let options = {
    pythonPath: "/usr/bin/python3"
  };
  PythonShell.run("predict.py", options, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});
const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log("Server started on http://localhost:8888");
});
