import React, { useEffect, useState } from "react";
import { socket } from "./LandingPage";
import { useNavigate } from "react-router-dom";
export default function StartingGame() {
  const navigate = useNavigate();
  const socketId = sessionStorage.getItem("socketId");
  const roomId = sessionStorage.getItem("roomId");
  const [gameArr, setGameArr] = useState([]);
  const [playerSymbol, setPlayerSymbol] = useState("");
  const [myTurn, setMyTurn] = useState(false);
  const [whoseTurn, setWhoseTurn] = useState("");
  const [player1Namestored, setPlayer1NameStored] = useState("");
  const [player2Namestored, setPlayer2NameStored] = useState("");
  const [player1socketId, setPlayer1socketId] = useState("");
  const [player2socketId, setPlayer2socketId] = useState("");
  useEffect(() => {
    socket.emit("game-started", roomId);

    socket.on("getfirst-object", (gameObject) => {
      setPlayer1socketId(gameObject.player1socketId);
      setPlayer2socketId(gameObject.player2socketId);
      setPlayer1NameStored(gameObject.player1Name);
      setPlayer2NameStored(gameObject.player2Name);
      if (socketId == gameObject.player1socketId) {
        setPlayerSymbol(gameObject.player1Sign);
        setMyTurn(gameObject.player1Turn);
      } else {
        setPlayerSymbol(gameObject.player2Sign);

        setMyTurn(gameObject.player2Turn);
      }
      setGameArr([...gameObject.gameArray]);
    });

    socket.on("played", (gameObject) => {
      if (!gameObject.isPlayer1winner && !gameObject.isPlayer2winner) {
        if (!gameObject.gameArray.includes("\u00A0")) {
          navigate("/tie-page");
        }
      }
      if (gameObject.isPlayer1winner) {
        sessionStorage.setItem("winner", gameObject.player1Name);
        navigate("/win-page");
      } else if (gameObject.isPlayer2winner) {
        sessionStorage.setItem("winner", gameObject.player2Name);
        navigate("/win-page");
      }
      if (socketId == gameObject.player1socketId) {
        setMyTurn(gameObject.player1Turn);
      } else {
        setMyTurn(gameObject.player2Turn);
      }
      let arr = gameObject.gameArray;
      setGameArr([...arr]);
    });
  }, [socket]);

  const changeArray = (e) => {
    console.log(e.target.id);
    let array = gameArr;
    array[e.target.id] = playerSymbol;
    setGameArr([...gameArr]);
    socket.emit("played", { gameArr, roomId });
  };

  return (
    <>
      <div style={{ textAlign: "center" }} className="textclass">
        <h1>Your symbol is {playerSymbol}</h1>
        <h3>
          {!myTurn
            ? "Your turn"
            : socketId != player1socketId
            ? player1Namestored + "'s Turn"
            : player2Namestored + "'s Turn"}
        </h3>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="flex"
          style={{
            height: "60vh",

            width: "400px",
          }}
        >
          <div className="textclass" style={{ textAlign: "center" }}>
            {gameArr.map((e, i) =>
              i % 3 != 0 ? (
                <button
                  disabled={e != "\u00A0" || myTurn}
                  id={i}
                  onClick={(e) => {
                    changeArray(e);
                    setMyTurn(!myTurn);
                  }}
                  style={
                    i == 5
                      ? {
                          fontSize: "50px",
                          width: "100px",
                          height: "100px",
                          borderBottom: "2px solid white",
                          borderTop: "2px solid white",
                        }
                      : i == 2 || i == 8
                      ? {
                          fontSize: "50px",
                          width: "100px",
                          height: "100px",
                          borderLeft: "2px solid white",
                        }
                      : i == 4
                      ? {
                          fontSize: "50px",
                          width: "100px",
                          height: "100px",
                          border: "2px solid white",
                        }
                      : { fontSize: "50px", width: "100px", height: "100px" }
                  }
                >
                  {e}
                </button>
              ) : (
                <>
                  <br />
                  <button
                    disabled={e != "\u00A0" || myTurn}
                    id={i}
                    onClick={(e) => {
                      changeArray(e);
                      setMyTurn(!myTurn);
                    }}
                    style={
                      i == 3
                        ? {
                            fontSize: "50px",
                            width: "100px",
                            height: "100px",
                            borderTop: "2px solid white",
                            borderBottom: "2px solid white",
                          }
                        : i == 0 || i == 6
                        ? {
                            fontSize: "50px",
                            width: "100px",
                            height: "100px",
                            borderRight: "2px solid white",
                          }
                        : { fontSize: "50px", width: "100px", height: "100px" }
                    }
                  >
                    {e}
                  </button>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
