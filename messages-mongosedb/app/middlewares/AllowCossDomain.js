module.exports= function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE, PUT, HEAD");
    res.header("Access-Control-Expose-Headers","Content-Length,X-Access-Token");
    res.header("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    if(req.method==='OPTIONS'){
        return res.sendStatus(200);
    }
    else{
        return next();
    }
}