const { httpCounter, SongListenerCounter } = require("../metrics/metrics");
const db = require("../models");
const Song = db.songs;

// Retrieve all Songs from the database.
exports.findAll = (req, res) => {
  httpCounter.inc({ method: req.method, path: req.path });
  SongListenerCounter.inc();
  Song.find()
    .then((data) => {
      res.send([
        {
          title: "$orries",
          artist: "Peachy!",
          album: " Shiloh",
          track: "$orries",
          year: "1",
          img_src: "./songs_images/$orries_Cover (front)_e.jpg",
          src: "./songs/$orries.mp3",
        },
        {
          title: "[oops]",
          artist: "potsu",
          album: "[oops]",
          track: "1",
          year: "",
          img_src: "./songs_images/[oops]_Cover (front)_e.jpg",
          src: "./songs/[oops].mp3",
        },
        {
          title: "5:32pm",
          artist: "The Deli",
          album: "Vibes 2",
          track: "12",
          year: "",
          img_src: "./songs_images/5 32pm_Cover (front)_e.jpg",
          src: "./songs/$orries.mp3",
        },
        {
          title: "88 Keys",
          artist: "Oatmello",
          album: "Snapshots",
          track: "3",
          year: "",
          img_src: "./songs_images/88 Keys_Cover (front)_e.jpg",
          src: "./songs/[oops].mp3",
        },
        {
          title: "Affection",
          artist: "Jinsang",
          album: "Life",
          track: "15",
          year: "",
          img_src: "./songs_images/Affection_Cover (front)_e.jpg ",
          src: "./songs/$orries.mp3",
        },
        {
          title: "Again",
          artist: "Wun Two",
          album: "Penthouse",
          track: "4",
          year: "",
          img_src: "./songs_images/Again_Cover (front)_e.jpg",
          src: "./songs/[oops].mp3",
        },
        {
          title: "Alone and Lonely",
          artist: "prxz",
          album: " Shiloh Dynasty",
          track: "Love Wounds",
          year: "2",
          img_src: "./songs_images/Alone and Lonely_Cover (front)_e.jpg",
          src: "./songs/$orries.mp3",
        },
        {
          title: "Baby You're Worth It",
          artist: "Kina",
          album: "Baby You're Worth It",
          track: "1",
          year: "",
          img_src: "./songs_images/Baby You're Worth It_Cover (front)_e.jpg",
          src: "./songs/[oops].mp3",
        },
        {
          title: "Backpack City",
          artist: "Flovry",
          album: " tender spring",
          track: "Ages Ago",
          year: "4",
          img_src: "./songs_images/ ",
          src: "./songs/[oops].mp3",
        },
        {
          title: "Beauty",
          artist: "eyeroze",
          album: "Heartless",
          track: "4",
          year: "",
          img_src: "./songs_images/Beauty_Cover (front)_e.jpg",
          src: "./songs/$orries.mp3",
        },
        {
          title: "Better Than He Can",
          artist: "Jennifer Flores",
          album: " Shiloh Dynasty",
          track: " LofiCentral",
          year: "All My Love",
          img_src: "./songs_images/Better Than He Can_Cover (front)_e.jpg",
          src: "./songs/[oops].mp3",
        },
      ]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving songs.",
      });
    });
};
