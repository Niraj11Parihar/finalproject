const  jwt = require("jsonwebtoken");
const secretKey = "niraj@3435";

exports.createToken=(user)=>{
    payload = {
        id : user._id,
        email : user.email,
        username : user.name,
        phone : user.phone
    }
        return jwt.sign(payload,secretKey);
}

exports.getToken=(token)=>{
    try {
        let decode =  jwt.verify(token,secretKey);
        return decode;
    } catch (error) {
        console.log("invalid or expired token")
    }
}