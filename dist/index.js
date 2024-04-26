"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const PubSubWebSocket_1 = require("./PubSubWebSocket");
const port = Number(process.argv[2]) || 8080;
const wss = new ws_1.WebSocketServer({ port });
wss.on("connection", (ws) => {
    const customWebSocket = new PubSubWebSocket_1.PubSubWebSocket(ws);
    customWebSocket.on("message", (message) => {
        let parseMessage = JSON.parse(message.toString());
        console.log(parseMessage);
        if (parseMessage.to) {
            customWebSocket.sendToChannel(parseMessage.to, JSON.stringify({
                from: "server",
                message: parseMessage.message,
            }));
            return;
        }
        else if (parseMessage.subscribe) {
            customWebSocket.subscribe(parseMessage.subscribe);
            return;
        }
        else if (parseMessage.unsubscribe) {
            customWebSocket.unsubscribe(parseMessage.unsubscribe);
            return;
        }
        else {
            console.log("Message IS: ", message.toString());
        }
    });
});
