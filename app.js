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

app.post("/disease/liver", (req, res) => {
  const {
    Age,
    Gender,
    Total_Bilirubin,
    Direct_Bilirubin,
    Alkaline_Phosphotase,
    Alamine_Aminotransferase,
    Aspartate_Aminotransferase,
    Total_Protiens,
    Albumin,
    Albumin_and_Globulin_Ratio_in_liver
  } = req.body;
  let options = {
    args: [
      "liver",
      Age,
      Gender,
      Total_Bilirubin,
      Direct_Bilirubin,
      Alkaline_Phosphotase,
      Alamine_Aminotransferase,
      Aspartate_Aminotransferase,
      Total_Protiens,
      Albumin,
      Albumin_and_Globulin_Ratio_in_liver
    ]
  };
  PythonShell.run("predict.py", options, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});
app.post("/disease/cardio", (req, res) => {
  const {
    id,
    age,
    gender,
    height,
    weight,
    ap_hi,
    ap_lo,
    cholesterol,
    gluc,
    smoke,
    alco,
    active
  } = req.body;
  let options = {
    args: [
      "cardio",
      id,
      age,
      gender,
      height,
      weight,
      ap_hi,
      ap_lo,
      cholesterol,
      gluc,
      smoke,
      alco,
      active
    ]
  };
  PythonShell.run("predict.py", options, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json(result);
  });
});
app.post("/disease/diabetes", (req, res) => {
  const {
    Pregnancies,
    Glucose,
    BloodPressure,
    SkinThickness,
    Insulin,
    BMI,
    DiabetesPedigreeFunction,
    Age
  } = req.body;
  let options = {
    args: [
      "diabetes",
      Pregnancies,
      Glucose,
      BloodPressure,
      SkinThickness,
      Insulin,
      BMI,
      DiabetesPedigreeFunction,
      Age
    ]
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
