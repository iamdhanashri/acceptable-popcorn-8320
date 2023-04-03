const redis =require("redis")



const redisClient = redis.createClient({
   password: "Oh1WqmxwXR8QDotwAn8xvbDqNykmKJma",
   socket: {
       host: "redis-18021.c212.ap-south-1-1.ec2.cloud.redislabs.com",
       port: 18021
   }
});

 redisClient.on("connect",async()=>{
    
    console.log("connected to redis");

 });

 redisClient.on("error",function(err){
    console.log(err.message)

 });

 redisClient.connect();

 module.exports={
    redisClient
 }

