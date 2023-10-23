import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config.js";

export const authValidation = (req, res, next) => {
    const token = req.headers['authorization'].split(" ")[1];
    
    if (!token) return res.status(401).json({ message: "Authorization denied" });

    jwt.verify(token, SECRET_TOKEN, (error, user) => {
        if (error) return res.status(404).json({ message: "Invalid Token" });
        req.user = user;

        next();
    });
};