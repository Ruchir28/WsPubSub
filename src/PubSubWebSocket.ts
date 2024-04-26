import { RedisClientType } from "redis";
import { WebSocket } from "ws";
import { RedisPubSubManager } from "./RedisPubSubManager";

class PubSubWebSocket {
  private publishClient: RedisClientType;
  private subscribeClient: RedisClientType;
  webSocket: WebSocket;

  constructor(ws: WebSocket) {
    this.webSocket = ws;
    this.publishClient = RedisPubSubManager.getInstance().publishClient;
    this.subscribeClient = RedisPubSubManager.getInstance().subscribeClient;
  }

  on(event: string, callback: (this: WebSocket, ...args: any[]) => void) {
    this.webSocket.on(event, callback);
  }


  subscribe(channel: string) {
    this.subscribeClient.subscribe(channel, (message: string) => {
      this.webSocket.emit("message", message);
    });
  }

  sendToChannel(channel: string, message: string) {
    this.publishClient.publish(channel, message);
  }

  unsubscribe(channel: string) {
    this.subscribeClient.unsubscribe(channel);
  }

  cleanup() {
    this.publishClient.quit();
    this.subscribeClient.quit();
    this.webSocket.close();
  }
}


export {PubSubWebSocket};