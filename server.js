const WebSocket = require("ws");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { collection, addDoc } = require("firebase/firestore");

const basic = {
  apiKey: "xxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxx",
  appId: "1:xxxxxxxxx:xxxxxxxxx:xxxxxxxxxxxx",
  measurementId: "G-xxxxxxxxxxxxx",
};
const rtapp = initializeApp(basic);
const rtdb = getFirestore(rtapp);
const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log("WebSocket server started on ws://localhost:8080");
});

const addtofirebase = async (data) => {
  try {
    await addDoc(collection(rtdb, "websocket"), JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
};

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (message) => {
    console.log(`Received: ${message}`);
    // Echo the message back
    ws.send(`Server received: ${message}`);
    await addtofirebase(message);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Optional: send a welcome message
  ws.send("Welcome to WebSocket server!");
});
