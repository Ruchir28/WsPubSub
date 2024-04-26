import {
  createClient,
  RedisClientOptions,
  RedisClientType,
} from "redis";

class RedisPubSubManager {
  private static instance: RedisPubSubManager;
  private static redisOptions?: RedisClientOptions;

  readonly publishClient: RedisClientType;
  readonly subscribeClient: RedisClientType;

  private constructor(options?: RedisClientOptions) {
    this.publishClient = createClient(options) as RedisClientType;
    this.subscribeClient = createClient(options) as RedisClientType;
    this.connectRedisClient();
  }

  private async connectRedisClient() {
    Promise.all([this.publishClient.connect(), this.subscribeClient.connect()])
      .then(() => {
        console.log("Connected to Redis");
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  static setRedisOptions(redisClientOptions?: RedisClientOptions) {
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


export { RedisPubSubManager };