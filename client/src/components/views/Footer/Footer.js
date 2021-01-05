import React from "react";
import { SmileOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
      }}
    >
      <p style={{ fontSize: "1rem", margin: "0" }}>
        Happy Coding <SmileOutlined />
      </p>
      <div style={{ fontSize: "0.6rem" }}>
        Thanks For Using This Boiler Plate by John Ahn
      </div>
    </div>
  );
}

export default Footer;
