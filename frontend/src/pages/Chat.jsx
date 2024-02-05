import { useState, useEffect, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import { isAccessTokenExpired } from "../utils/auth";
import { userAuthStore } from "../store/store";

const Chat = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [socketUrl] = useState("ws://127.0.0.1:8000");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [accessToken, setAccessToken] = useState(Cookies.get("access_token"));

  const api = useAxios();
  const [user] = userAuthStore((state) => [state.user()]);

  // Function to refresh access token
  const refreshToken = useCallback(async () => {
    try {
      const response = await api.get("chat_api/");
      if (response.status == 200) {
        setAccessToken(Cookies.get("access_token"));
      } else {
        console.error(response.status);
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
    }
  }, [api]);

  useEffect(() => {
    if (!accessToken || isAccessTokenExpired(accessToken)) {
      refreshToken();
    }
  }, [accessToken, refreshToken]);

  const { readyState, sendJsonMessage } = useWebSocket(socketUrl, {
    queryParams: {
      token: accessToken,
    },
    onOpen: () => {
      console.log("Connected");
    },

    onClose: () => {
      console.log("Diconnected");
    },

    onMessage: (e) => {
      const data = JSON.parse(e.data);
      console.log(data.type);

      switch (data.type) {
        case "welcome_message":
          setWelcomeMessage(data.message);
          break;
        case "chat_message_echo":
          setMessageHistory((prev) => prev.concat(data));
          break;
        default:
          console.error("Unknown message type");
          break;
      }
      console.log(e);
    },

    shouldReconnect: () => true,
    reconnectAttempts: 5,
    reconnectInterval: (attemptNumber) => {
      Math.min(Math.pow(2, attemptNumber) * 1000, 10000);
    },
    onReconnectStop: () =>
      console.error(
        "An error occcured when connecting to the server! Try again later.",
      ),
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    sendJsonMessage({
      type: "chat_message",
      message,
      name: user.username,
    });
    setName("");
    setMessage("");
  };

  return (
    <>
      <h1>The websocket is currently: {connectionStatus}!</h1>
      <h2>{welcomeMessage}</h2>
      <div>
        <input
          name="message"
          placeholder="message"
          onChange={handleChangeMessage}
          value={message}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <hr />
      <ul>
        {messageHistory.map((message, idx) => (
          <div className="" key={idx}>
            {message.name} {message.message}
          </div>
        ))}
      </ul>
    </>
  );
};

export default Chat;
