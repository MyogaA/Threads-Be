import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default new class AuthenticationMiddlewares {
  Authentication(req, res, next) {
    try {
      const { authorization } = req.headers;
      let token;
    
      if (authorization && authorization.startsWith("Bearer ")) {
        token = authorization.split(" ")[1];
      } else {
        token = req.headers["x-access-token"] || req.cookies["jwt"] || null;
      }
      
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const loginSession = jwt.verify(token, "token");
      res.locals.loginSession = loginSession;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  }
}

