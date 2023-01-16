const {
  PublicContentCounter,
  UserContentCounter,
  AdminContentCounter,
  ModeratorContentCounter,
  httpCounter
} = require("../metrics/metrics");

exports.allAccess = (req, res) => {
  httpCounter.inc({ method: req.method, path: req.path });
  PublicContentCounter.inc();
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  httpCounter.inc({ method: req.method, path: req.path });
  UserContentCounter.inc();
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  httpCounter.inc({ method: req.method, path: req.path });
  AdminContentCounter.inc();
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  httpCounter.inc({ method: req.method, path: req.path });
  ModeratorContentCounter.inc();
  res.status(200).send("Moderator Content.");
};
