import React from "react";
import "../index.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function TiePage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        width: "100vw",
      }}
    >
      <h1 className="textclass">it's a Tie</h1>
      <div style={{ marginTop: "20px" }}>
        <Button
          onClick={() => {
            navigate("/");
          }}
          variant="contained"
          size="large"
        >
          Play again
        </Button>
      </div>
    </div>
  );
}
