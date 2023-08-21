import "./ChatPage.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { sendMessageToOpenAI } from "../../api/gptRequest";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { authTokens, autoPromt } from "../../states/atoms";
import { simpleFetch, urls } from "../../utils/utilsBundle";

function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState("");
  const location = useLocation();
  const advice = useRecoilValue(autoPromt);
  const [alreadyTake, setAlreadyTake] = useState(false);
  const authToken = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const scrollRef = useRef(null);

  //console.log("env name: ", process.env.REACT_APP_OPENAI_API_KEY);

  const handleMessageSubmit = async () => {
    if (input == "") {
      return;
    }
    let data = await simpleFetch(
      urls.chatSendPath,
      "POST",
      JSON.stringify({
        user_id: userInfo.username,
        content: input,
      }),
      authToken
    );
    setMessages([
      ...messages,
      { text: input, isUser: true },
      { text: data.text, isUser: data.isUser },
    ]);
    setInput("");
  };

  const detectEnter = (e) => {
    if (e.key == "Enter" && e.nativeEvent.isComposing === false) {
      handleMessageSubmit();
    }
  };

  // for chat scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    let data = await simpleFetch(
      urls.chatListPath,
      "POST",
      JSON.stringify({
        user_id: userInfo.username,
      }),
      authToken
    );
    setMessages(data);
  };

  // for fetch messages
  useEffect(() => {
    fetchMessages();
    if (advice !== null && !alreadyTake) {
      setInput(advice);
      setAlreadyTake(true);
    }
  }, []);

  return (
    <div className="page_Container">
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
        <div ref={scrollRef}></div>
      </div>
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="ask me anything..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={detectEnter}
        />
        {/* <button className="button" onClick={handleMessageSubmit}>
          Send
        </button> */}
      </div>
    </div>
  );
}

export default ChatPage;
