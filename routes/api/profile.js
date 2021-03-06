const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ message: "Profile functional" });
});

// @route   GET api/profile
// @desc    Current user profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      //.populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @oute    GET api/profiles/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    //.populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @TODO - Fix this
// @route   GET api/profile/username/:username
// @desc    Get profile by username
// @access  Public
router.get("/username/:username", (req, res) => {
  const errors = {};
  Profile.findOne({ username: req.params.username })
    //.populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user.";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(errors => res.status(404).json(errors));
});

// @TODO - Fix this
// @route   GET api/profile/user_id
// @desc    Get profile by user_id
// @access  Public

router.get("/:id", (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .then(profile => res.json(profile))
    .catch(err => res.json(err));
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validations
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Profilefields
    const profilefields = {};
    profilefields.user = req.user.id;
    if (req.body.username) profilefields.username = req.body.username;
    if (req.body.company) profilefields.company = req.body.company;
    if (req.body.website) profilefields.website = req.body.website;
    if (req.body.location) profilefields.location = req.body.location;
    if (req.body.status) profilefields.status = req.body.status;
    if (req.body.bio) profilefields.bio = req.body.bio;
    // skills from CSV
    if (typeof req.body.skills !== "undefined")
      profilefields.skills = req.body.skills.split(",");
    // Social
    profilefields.social = {};
    if (req.body.githubusername)
      profilefields.social.githubusername = req.body.githubusername;
    if (req.body.youtube) profilefields.social.youtube = req.body.youtube;
    if (req.body.twitter) profilefields.social.twitter = req.body.twitter;
    if (req.body.facebook) profilefields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profilefields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profilefields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update the profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profilefields },
          { new: true }
        ).then(profile => {
          res.json(profile);
        });
      } else {
        // Create a profile
        Profile.findOne({ username: profilefields.username }).then(profile => {
          if (profile) {
            errors.username = "That username already exists.";
            res.status(404).json(errors);
          }
          new Profile(profilefields).save().then(profile => {
            res.json(profile);
          });
        });
      }
    });
  }
);

// @route   POST api/profile/experience
// @desc    Add experience to a profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newexperience = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        current: req.body.current,
        description: req.body.description
      };

      profile.experience.unshift(newexperience);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to a profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const neweducation = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(neweducation);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @TODO - Fix - Can't grab id from params?
// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const indextoremove = profile.experience
          .map(i => i.id)
          .indexOf(req.params.exp_id);

        profile.experience.splice(indextoremove, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @TODO - Fix
// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const indextoremove = profile.education
          .map(i => i.id)
          .indexOf(req.params.exp_id);

        profile.education.splice(indextoremove, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @TODO - Fix
// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
