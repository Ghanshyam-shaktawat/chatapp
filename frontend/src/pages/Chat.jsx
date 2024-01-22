import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Chat = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const { readyState } = useWebSocket("ws://127.0.0.1:8000", {
    onOpen: () => {
      console.log("Connected");
    },
    onClose: () => {
      console.log("Diconnected");
    },
    onMessage: (e) => {
      const data = JSON.parse(e.data);
      console.log(data.type);
      if (data.type == "welcome_message") {
        console.log("working");
      }
      switch (data.type) {
        case "welcome_message":
          setWelcomeMessage(data.message);
          break;
        default:
          // setWelcomeMessage(data.message);
          console.error("Unknown message type");
          break;
      }
      console.log(e);
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <>
      <h1>The websocket is currently: {connectionStatus}!</h1>
      <h2>{welcomeMessage}</h2>
    </>
  );
};

export default Chat;
