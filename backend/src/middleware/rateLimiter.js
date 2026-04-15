const ratelimit=require("../config/upstash")

const rateLimit=async(req,res,next)=>{
    try{
        const{success}=await ratelimit.limit(req.ip);
        if(!success){
            return res.status(429).json({message:"Too many time requests,plz try again later"});
        }
        next();
    }
    catch(error){
        console.log("Rate Limit error");
        next(error);
    }
};

module.exports=rateLimit;