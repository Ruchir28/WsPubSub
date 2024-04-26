"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisPubSubManager = void 0;
const redis_1 = require("redis");
class RedisPubSubManager {
    constructor(options) {
        this.publishClient = (0, redis_1.createClient)(options);
        this.subscribeClient = (0, redis_1.createClient)(options);
        this.connectRedisClient();
    }
    connectRedisClient() {
        return __awaiter(this, void 0, void 0, function* () {
            Promise.all([this.publishClient.connect(), this.subscribeClient.connect()])
                .then(() => {
                console.log("Connected to Redis");
            })
                .catch((error) => {
                console.error(error);
                throw error;
            });
        });
    }
    static setRedisOptions(redisClientOptions) {
        RedisPubSubManager.redisOptions = redisClientOptions;
        return RedisPubSubManager;
    }
    static getInstance() {
        if (!RedisPubSubManager.instance) {
            RedisPubSubManager.instance = new RedisPubSubManager(RedisPubSubManager.redisOptions);
        }
        return RedisPubSubManager.instance;
    }
    cleanup() {
        this.publishClient.quit();
        this.subscribeClient.quit();
    }
}
exports.RedisPubSubManager = RedisPubSubManager;
