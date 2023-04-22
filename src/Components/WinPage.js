import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";
import "../index.css";
export default function WinPage() {
  const winnerName = sessionStorage.getItem("winner");
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(!show);
    }, 2500);
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [show]);
  return (
    <>
      <div style={{ display: "flex", width: "100vw" }}>
        <div>
          {show ? (
            <div>
              <ConfettiExplosion
                force={0.6}
                duration={6000}
                particleCount={200}
                height={1600}
                width={1600}
              />
            </div>
          ) : (
            <ConfettiExplosion
              force={0.6}
              duration={6000}
              particleCount={200}
              height={1600}
              width={1600}
            />
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          flexDirection: "column",
        }}
      >
        <h1 className="textclass">Winner is</h1>
        <h1 className="textclass">{winnerName}</h1>
      </div>
    </>
  );
}
