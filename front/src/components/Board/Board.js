import React from "react";

export default function Board({ id, title, content, writer, time_stamp }) {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>{title}</h1>
      </div>
      <div>
        <h3 style={{ textAlign: "right", marginRight: "50px" }}>
          created by {writer}
        </h3>
      </div>
      <div>
        <h3 style={{ textAlign: "right", marginRight: "50px" }}>
          {time_stamp}
        </h3>
      </div>
      <div>
        <h2 style={{ textAlign: "center", marginTop: "70px" }}>{content}</h2>
      </div>
    </div>
  );
}
