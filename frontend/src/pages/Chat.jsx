import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Cookies from "js-cookie";
import { userAuthStore } from "../store/store";
import { getAccessToken, setAuthUser } from "../utils/auth";
import useAxios from "../utils/useAxios";

const Chat = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [socketUrl] = useState("ws://127.0.0.1:8000");
  const [message, setMessage] = useState("");
  const [friendList, setFriendList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(true);
  const [accessToken, setAccessToken] = useState(Cookies.get("access_token"));
  const [refreshToken, setRefreshToken] = useState(
    Cookies.get("refresh_token"),
  );

  const [user] = userAuthStore((state) => [state.user()]);
  const api = useAxios();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await getAccessToken(refreshToken);
        setAuthUser(response.access, response.refresh);
        setRefreshToken(response.refresh);
        setAccessToken(response.access);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch tokens:", error);
      }
    };

    const fetchFriendList = async () => {
      try {
        const response = await api.get("/friends");
        setFriendList(response.data);
      } catch (error) {
        console.log("Failed to fetch friend list:", error);
      }
    };

    fetchTokens();
    fetchFriendList();

    const timer = setTimeout(() => {
      // Initialize WebSocket connection after 5 seconds
      // You can also conditionally initialize based on loading state or other conditions
      setTimer(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // useEffect(() => {
  //   const fetchFriendList = async () => {
  //     try {
  //       const response = await api.get("/friends");
  //       setFriendList(response.data);
  //     } catch (error) {
  //       console.log("Failed to fetch friend list:", error);
  //     }
  //   };
  //
  //   // Fetch friend list only when access token is updated
  //   if (!loading && !timer) {
  //     fetchFriendList();
  //   }
  // }, [accessToken, loading, timer]);

  const { readyState, sendJsonMessage } = useWebSocket(
    socketUrl,
    {
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
      // shouldConnect: () => false,
    },
    Boolean(!loading && !timer),
  );

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
    setMessage("");
  };

  return (
    <>
      <hr />
      <h3>Friend List:</h3>
      <ul>
        {friendList &&
          friendList.map((friend) => (
            <li key={friend.id}>{friend.username}</li>
          ))}
      </ul>
      <hr />
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
