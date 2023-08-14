import "./App.css";
import { useState } from "react";
import { sendMessageToOpenAI } from "./gptRequest";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");

  //console.log("env name: ", process.env.REACT_APP_OPENAI_API_KEY);

  const handleMessageSubmit = async () => {
    const response = await sendMessageToOpenAI(input);
    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: response, isUser: false },
    ]);
    setInput("");
  };

  return (
    <div className="App_Container">
      <div className="chat">
        {Array.isArray(messages)
          ? messages.map((message, index) => (
              <div
                key={index}
                className={message.isUser ? "user-message" : "bot-message"}
              >
                {message.text}
              </div>
            ))
          : null}
      </div>

      <div className="input-container">
        <input
          className="input"
          tpye="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="button" onClick={handleMessageSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
