"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubWebSocket = void 0;
const RedisPubSubManager_1 = require("./RedisPubSubManager");
class PubSubWebSocket {
    constructor(ws) {
        this.webSocket = ws;
        this.publishClient = RedisPubSubManager_1.RedisPubSubManager.getInstance().publishClient;
        this.subscribeClient = RedisPubSubManager_1.RedisPubSubManager.getInstance().subscribeClient;
    }
    on(event, callback) {
        this.webSocket.on(event, callback);
    }
    subscribe(channel) {
        this.subscribeClient.subscribe(channel, (message) => {
            this.webSocket.emit("message", message);
        });
    }
    sendToChannel(channel, message) {
        this.publishClient.publish(channel, message);
    }
    unsubscribe(channel) {
        this.subscribeClient.unsubscribe(channel);
    }
    cleanup() {
        this.publishClient.quit();
        this.subscribeClient.quit();
        this.webSocket.close();
    }
}
exports.PubSubWebSocket = PubSubWebSocket;
