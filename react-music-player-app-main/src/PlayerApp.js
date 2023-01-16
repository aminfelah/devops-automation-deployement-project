import React from "react";
import { useState, useEffect } from "react";
import "./Player.css";
import Player from "./components/Player";
import Axios from "axios";
require('dotenv').config()
function PlayerApp() {
  const [songs, setSongs] = useState([
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
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    if (songs.length <6) {
      Axios.get( `http://20.23.81.52/song/api/songs`|| `${process.env.BACKEND_URL}/song/api/songs`).then((response) =>
        setSongs(response.data)
      );
    }
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  return (
    <div className="App">
      {/* <div className="weirdShape"></div> */}
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />
    </div>
  );
}

export default PlayerApp;
