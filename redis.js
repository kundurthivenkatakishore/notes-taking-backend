import redis from "redis";
import dotenv from "dotenv"

dotenv.config()

const redisClient = () => {
    return redis.createClient({
        url: process.env.REDIS_URL
    })
}

const client = redisClient();

client.on("error", (err) => {
    console.log(err)
})

client.on("connect", () => {
    console.log("Connected to Redis");
})

client.on("end", () => {
    console.log("Redis Connection Ended")
})

client.on("SIGQUIT", () => {
    client.quit()
})

export default client;