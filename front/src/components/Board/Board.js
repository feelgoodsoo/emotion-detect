import React from "react";

export default function Board({ id, title, content, writer }) {
  return (
    <div>
      <h2>{title}</h2>
      <h2>{content}</h2>
      <h3>{writer}</h3>
    </div>
  );
}
