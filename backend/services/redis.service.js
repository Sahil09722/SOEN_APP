import Redis from "ioredis";
//Redis is used as a cache to store frequently accessed data, reducing database queries and improving performance.
const redisClient = new Redis({
     host:process.env.REDIS_HOST,
     port:process.env.REDIS_PORT,
     password:process.env.REDIS_PASSWORD
});

redisClient.on("connect", () => {
    console.log("Connected to Redis");
});

export default redisClient;