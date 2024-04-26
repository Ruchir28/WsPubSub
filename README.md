# Websocket-PubSub

## Description

Receive Messages from pub/sub directly as events on websocket. 
Currently supports Redis.

## Usage
```
import { WebSocketServer } from "ws";

import { PubSubWebSocket } from "./PubSubWebSocket";

const port = Number(process.argv[2]) || 8080;

const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {

  // inititate a PubSubWebSocket by passing in websocket
  const customWebSocket = new PubSubWebSocket(ws);
  
  customWebSocket.on("message", (message) => {
    console.log(message);
  });

  // Send to any channel over pubsub like 
  //   customWebSocket.sendToChannel(parseMessage.to, JSON.stringify({
  //      from: "server",
  //      message: parseMessage.message,
  //    }));


  // Subscribe to message from channels 
 //  customWebSocket.subscribe(parseMessage.subscribe);
 //  whenever message arrive on subscribed channel, it will come to 
 //  websocket as a message.
});

```

