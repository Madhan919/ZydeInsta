const express = require("express");
const app = express();
const checkAuth = require("../Authentication/check-auth");
const router = express.Router();
var fs = require("fs");
const multer = require("multer");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./post/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const profilestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./profile/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const profileupload = multer({ storage: profilestorage });
const upload = multer({ storage: storage });

const Posts = require("../Models/Posts");
const Profile = require("../Models/Users");
const { Body } = require("node-fetch");

router.patch(
  "/change-profile",
  upload.single("profile"),
  checkAuth,
  (req, res, next) => {
    console.log(req.file);
    Profile.findOneAndUpdate(
      { email: req.userData.email },
      { profile: req.file.filename }
    )
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        res.send(error);
      });
  }
);

router.delete(
  "/remove-profile",
  upload.single("profile"),
  checkAuth,
  (req, res, next) => {
    Profile.findOneAndUpdate({ email: req.userData.email }, { profile: null })
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.log(error);
        res.send({ message: error });
      });
  }
);

router.get(
  "/change-profile",
  upload.single("profile"),
  checkAuth,
  async (req, res, next) => {
    await Profile.findOne({ email: req.userData.email })
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

router.post("/", upload.single("image"), (req, res, next) => {
  console.log(req.file);
  const posts = new Posts({
    caption: req.headers.caption,
    image: req.file.filename,
  });
  try {
    posts.save();
    res.status(200).json({ message: "Uploaded successfully...!" });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
});

router.get("/", upload.single("image"), async (req, res, next) => {
  try {
    const instaUsers = await Posts.find();
    res.status(200).json({ data: instaUsers });
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
});

module.exports = router;
