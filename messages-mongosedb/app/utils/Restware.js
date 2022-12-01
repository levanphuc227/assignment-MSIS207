const sendSuccessOne = (res, data, iHttpCode) => {
    if (!res) {
        return;
    }
    let httpStatus=iHttpCode?iHttpCode:200;
    let out={};
    if(data){
        out.data=data;
    }
    out.message='';
    out.result='ok';
    res.status(httpStatus);
    res.contentType('json');
    return res.json(out);
}

const sendSuccessMany=(res,data,iHttpCode)=>{
    if (!res) {
        return;
    }
    let httpStatus=iHttpCode?iHttpCode:200;
    let out={};
    if(data){
        out.data=data;
    }
    out.message='';
    out.result='ok';
    res.status(httpStatus);
    res.contentType('json');
    return res.json(out);
}

const sendError=(res,code,message,httpCode,description,errors)=>{
    if(!res){
        return;
    }
    
    let out={};
    out.code=code;
    out.message=message?message.toString():"none";
    if(description){
        out.desc=description.toString();
    }else if(errors){
        out.errors=errors;
    }
    let status=httpCode?httpCode:500;
    res.status(status);
    res.contentType('json');
    return res.json(out);
}

module.exports={
    sendSuccessOne,
    sendSuccessMany,
    sendError
}