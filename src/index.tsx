import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import io from "socket.io-client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const socket = io("localhost:7100");
export type AppSocket = typeof socket;
export const AppContext = React.createContext({
  socket: {} as AppSocket,
});

root.render(
  <React.StrictMode>
    <AppContext.Provider
      value={{
        socket: socket,
      }}
    >
      <App />
    </AppContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
