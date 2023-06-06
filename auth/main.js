require("dotenv").config();
const express = require("express");
const db = require("./db");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// login
app.post("/api/v1/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Incorrect email." });
  }

  bcrypt.compare(password, user?.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);
      return res.json({ token });
    } else {
      return res.status(401).json({ message: "Incorrect password." });
    }
  });
});

// reguster
app.post("/api/v1/register", async (req, res) => {
  let { email, password, name } = req.body;

  try {
    // check if email exists
    const searchByEmail = await User.countDocuments({ email });
    console.log(searchByEmail);
    if (searchByEmail) {
      return res
        .status(422)
        .json({ errors: [{ email: ["Email already exists."] }] });
    }

    // register user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    res.status(201).json({ user, message: "User registered successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
});

app.get("/api/v1/verify", async (req, res) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).end();
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY);
    return res.status(200).end();
  } catch (e) {
    return res.status(400).end();
  }
});

const port = process.env.PORT || 3002;
const start = async () => {
  await db();
  app.listen(port, () => {
    console.log(`product service is up in port ${port}....`);
  });
};
start();
