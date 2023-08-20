import React from "react";

export default function Board({ id, title, content, username }) {
  return (
    <div>
      <h2>{title}</h2>
      <h2>{content}</h2>
      <h3>{username}</h3>
    </div>
  );
}
