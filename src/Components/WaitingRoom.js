import React, { useEffect, useState } from "react";
import { socket } from "./LandingPage";
import { useNavigate } from "react-router-dom";

export default function WaitingRoom() {
  const [waitMsg, setWaitMsg] = useState(true);
  const [player2Name, setPlayer2Name] = useState("");
  const [roomId1, setRoomId] = useState("");
  const [hideButWhatsapp, setHideButWhatsapp] = useState(true);
  let [counter, setCounter] = useState(2);
  const navigate = useNavigate();

  let roomId = sessionStorage.getItem("roomId");
  useEffect(() => {
    if (window.innerWidth > 0 && window.innerWidth < 480) {
      setHideButWhatsapp(false);
    }
    setRoomId(roomId);
    socket.on("user-joined", (gameObject) => {
      setWaitMsg(false);
      setPlayer2Name(gameObject.player2Name);
      setInterval(() => {
        console.log(counter);
        setCounter(--counter);
        if (counter == 0) {
          navigate("/starting-game");
        }
      }, 2000);
    });
  }, [socket]);
  return (
    <div style={{ display: "flex", height: "80vh" }}>
      <div style={{ textAlign: "center" }} className="textclass">
        <h1>{roomId1}</h1>
        <h2 hidden={!waitMsg}>Waiting for user to connect</h2>
        <h3 hidden={waitMsg}>{`User ${player2Name} joined`}</h3>
        <p hidden={!waitMsg} className="textclass">
          Share room code on whatsapp
        </p>
        <h2 hidden={waitMsg}>Game Starting in</h2>
        <h1 hidden={waitMsg}>{counter}</h1>
        <a
          href={
            "whatsapp://send?text=To play tick-tac-toe please open the below link https://tic-tac-toe-multiplayer-mriu.onrender.com/ enter room id - " +
            roomId
          }
          hidden={hideButWhatsapp}
        >
          <img src="https://img.icons8.com/pastel-glyph/64/FFFFFF/whatsapp--v2.png" />
        </a>
        <a
          href={
            "https://api.whatsapp.com/send?text=To play tick-tac-toe please open the below link https://tic-tac-toe-multiplayer-mriu.onrender.com/ enter room id - " +
            roomId
          }
          data-action="share/whatsapp/share"
          target="_blank"
          hidden={!hideButWhatsapp}
        >
          <img src="https://img.icons8.com/pastel-glyph/64/FFFFFF/whatsapp--v2.png" />
        </a>
      </div>
    </div>
  );
}
