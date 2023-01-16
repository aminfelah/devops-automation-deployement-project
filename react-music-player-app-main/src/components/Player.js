import React, { useState, useRef, useEffect } from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";

function Player(props) {
  const audioElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  return (
    <>
      <div>
        <div className="text-anim">
          <strong>Upcoming Song:</strong>
        </div>

        <div className="nextsong-details">
          {props.songs[props.nextSongIndex] && (
            <img
              src={
                props.songs[props.nextSongIndex].img_src
                  ? props.songs[props.nextSongIndex].img_src
                  : "./songs_images/[oops]_Cover (front)_e.jpg"
              }
              alt={
                props.songs[props.nextSongIndex].title
                  ? props.songs[props.nextSongIndex].title
                  : "[oops]"
              }
              style={{ width: "4em", height: "auto" }}
            />
          )}
          {!props.songs[props.nextSongIndex] && (
            <img
              src="./songs_images/[oops]_Cover (front)_e.jpg"
              alt="[oops]"
              style={{ width: "4em", height: "auto" }}
            />
          )}
          {props.songs[props.nextSongIndex] && (
            <p>
              <b>{props.songs[props.nextSongIndex].title} </b>&nbsp; by &nbsp;
              <b>{props.songs[props.nextSongIndex].artist}</b>
              {/* &nbsp; from album
            &nbsp; */}
              {/* <b>{props.songs[props.nextSongIndex].album}</b> */}
            </p>
          )}
          {!props.songs[props.nextSongIndex] && (
            <p>
              <b>{"[oops]"}</b>&nbsp; by &nbsp;
              <b>potsu</b>
              {/* &nbsp; from album
            &nbsp; */}
              {/* <b>{props.songs[props.nextSongIndex].album}</b> */}
            </p>
          )}
        </div>
      </div>
      <div className="music-player">
        {props.songs[props.currentSongIndex] && (
          <audio
            src={props.songs[props.currentSongIndex].src}
            ref={audioElement}
          ></audio>
        )}
        {!props.songs[props.currentSongIndex] && (
          <audio src={"./songs/$orries.mp3"} ref={audioElement}></audio>
        )}
        {props.songs[props.currentSongIndex] && (
          <PlayerDetails song={props.songs[props.currentSongIndex]} />
        )}
        {!props.songs[props.currentSongIndex] && (
          <PlayerDetails
            song={{
              title: "$orries",
              artist: "Peachy!",
              album: " Shiloh",
              track: "$orries",
              year: "1",
              img_src: "./songs_images/$orries_Cover (front)_e.jpg",
              src: "./songs/$orries.mp3",
            }}
          />
        )}
        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          SkipSong={SkipSong}
        />

        <div className="player__footer">
          <ul className="list list--footer">
            <li>
              <a href="#" className="list__link">
                <i className="fa fa-heart-o"></i>
              </a>
            </li>

            <li>
              <a href="#" className="list__link">
                <i className="fa fa-random"></i>
              </a>
            </li>

            <li>
              <a href="#" className="list__link">
                <i className="fa fa-undo"></i>
              </a>
            </li>

            <li>
              <a href="#" className="list__link">
                <i className="fa fa-ellipsis-h"></i>
              </a>
            </li>
          </ul>
        </div>

        {/* <h4>Lofi Music Player React </h4> */}
      </div>
    </>
  );
}
export default Player;
