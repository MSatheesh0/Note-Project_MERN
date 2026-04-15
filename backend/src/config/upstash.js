const Ratelimit = require("@upstash/ratelimit");
const Redis = require("@upstash/redis");
const dotenv = require("dotenv");

dotenv.config();

const ratelimit = new Ratelimit.Ratelimit({
    redis: new Redis.Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    }),
    limiter: Ratelimit.Ratelimit.slidingWindow(20, "20 s"),
});

module.exports = ratelimit;