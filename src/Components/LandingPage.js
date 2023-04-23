import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { serverUrl } from "../variables";
import "../index.css";
import { Button } from "@mui/material";

export const socket = io(serverUrl);
let GameName = "Welcome to tic-tac-toe";
export default function LandingPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [nameError, setnameError] = useState("");
  const [roomId, setRoomId] = useState("");
  const [hideCreateRoom, setHideCreateRoom] = useState(true);
  const [dayNightMode, setDayNightMode] = useState("");
  const [disableJoinButton, setDisableJoinButton] = useState(true);
  const [stringarr, setStringarr] = useState(["Tic", "Tac", "Toe"]);
  const [allHide, setAllHide] = useState(false);
  let [counter, setCounter] = useState(2);
  const [player1joinName, setPlayer1joinName] = useState("");

  useEffect(() => {}, [socket]);

  const createRoom = () => {
    socket.emit("create-room", username);
    socket.on("room-created", (gameObject) => {
      console.log("create room");
      console.log(gameObject);
      console.log(socket.recovered);
      sessionStorage.setItem("roomId", gameObject.roomId);
      sessionStorage.setItem("socketId", socket.id);
      navigate("/waiting-room");
      console.log(socket.recovered);
    });
  };

  const joinRoom = () => {
    socket.emit("joining-room", { username, roomId });
    socket.on("joining-status", (gameObject) => {
      console.log("joiningroom called");
      console.log(gameObject);
      if (gameObject == "error") {
        console.log("error");
        window.alert("error");
      } else {
        sessionStorage.setItem("roomId", gameObject.roomId);
        sessionStorage.setItem("sockedId", socket.id);
        setPlayer1joinName(gameObject.player1Name);
        setAllHide(true);
        setInterval(() => {
          console.log(counter);
          setCounter(--counter);
          if (counter == 0) {
            navigate("/starting-game");
          }
        }, 2000);
      }
    });
  };
  const onChangeName = (e) => {
    setUsername(e.target.value);
    if (e.target.value.trim().length < 4) {
      setnameError("Name should contain minimum 4 letters");
      setHideCreateRoom(true);
      return;
    } else {
      setnameError("");
      setHideCreateRoom(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className="textclass">
        <h1 className={{ dayNightMode }}>Welcome</h1>
        <h1 style={{ textAlign: "center" }} className={{ dayNightMode }}>
          To
        </h1>
      </div>
      <div class="waviy" style={{ textAlign: "center", paddingTop: "10px" }}>
        <span style={{ animationDelay: `calc(.1s * 1)` }} id="move">
          Tic &nbsp;
        </span>

        <span style={{ animationDelay: `calc(.1s * 3)` }}>Tac &nbsp;</span>

        <span style={{ animationDelay: `calc(.1s * 5)` }}>Toe</span>
      </div>
      <div className="flex">
        <h2
          className={"textclass"}
          hidden={allHide}
          style={{ marginTop: "40px" }}
        >
          Play with friends
        </h2>
        <h2 hidden={!allHide} className="textclass">
          Joining {player1joinName}'s room
        </h2>
        <h2 hidden={!allHide} className="textclass">
          Game starting in
        </h2>
        <h1 hidden={!allHide} className="textclass">
          {counter}
        </h1>
        <h3 className={"textclass"} hidden={allHide}>
          Enter your Name
        </h3>
        <input
          hidden={allHide}
          className={{ dayNightMode }}
          type="text"
          placeholder="Enter your Name"
          onChange={onChangeName}
        />
        <span
          hidden={allHide}
          className={{ dayNightMode }}
          style={{ color: "white" }}
        >
          {nameError}
        </span>
        {hideCreateRoom || allHide ? (
          <></>
        ) : (
          <Button onClick={createRoom} variant="contained" size="large">
            Create Room
          </Button>
        )}

        <input
          type="text"
          hidden={hideCreateRoom || allHide}
          onChange={(e) => {
            setRoomId(e.target.value);
            if (e.target.value.length > 4) {
              setDisableJoinButton(false);
            } else {
              setDisableJoinButton(true);
            }
          }}
          placeholder="Enter room ID"
        ></input>
        {hideCreateRoom || allHide ? (
          <></>
        ) : (
          <Button onClick={joinRoom} variant="contained" size="large">
            Join Room
          </Button>
        )}
      </div>
    </div>
  );
}
