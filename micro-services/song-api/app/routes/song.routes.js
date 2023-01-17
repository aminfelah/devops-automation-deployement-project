module.exports = app => {
  const songs = require("../controllers/song.controller.js");

  var router = require("express").Router();

  // Retrieve all Songs
  router.get("/", songs.findAll);


  app.use("/api/songs", router);
};
