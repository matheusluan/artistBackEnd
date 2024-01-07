import jwt from "jsonwebtoken";

const TOKEN = process.env.JWT_SECRET_TOKEN || "";

export const generateToken = (payload: object) => jwt.sign(payload, TOKEN);

export const verifyToken = (token: string) => jwt.verify(token, TOKEN);
