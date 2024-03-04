const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  console.log("Valiating token", req.body);
  const {operatorId, token, userId} = req.body;
  if(token != null) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      console.log("Validating user in token authentication + 1");
      console.log(decoded.user);
      req.user = decoded.user;
      next();
    });
  }
  //let token;
  //let authHeader = req.headers.Authorization || req.headers.authorization;
  // if (authHeader && authHeader.startsWith("Bearer")) {
  //   token = authHeader.split(" ")[1];
  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
  //     if (err) {
  //       res.status(401);
  //       throw new Error("User is not authorized");
  //     }
  //     console.log("Validating user in token authentication");
  //     console.log(decoded.user);
  //     req.user = decoded.user;
  //     next();
  //   });

  //   if (!token) {
  //     res.status(401);
  //     throw new Error("User is not authorized or token is missing");
  //   }

  
});

module.exports = validateToken;