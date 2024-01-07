import { NextFunction, Request, Response } from "express"; 
 import { AppError } from "../handlers/errors.handler";
 import { verifyToken } from "../utils/jsonwebtoken.util"; 
  
 interface Token { 
   userId: string; 
 } 
  
 export function ensureAuthentication(request: Request, response: Response, next: NextFunction) { 
   const authorization = request.headers.authorization; 
  
   if (!authorization) { 
     throw new AppError("Token não enviado. Se autentique e tente novamente!", 401); 
   } 
  
   if (!authorization.toUpperCase().includes("BEARER")) { 
     throw new AppError("Token precisa ser BEARER. Se autentique e tente novamente!", 401); 
   } 
  
   const token = authorization.split(" ")[1]; 
  
   if (!token) { 
     throw new AppError("Token não enviado. Se autentique e tente novamente!", 401); 
   } 
  
   try { 
     const data = verifyToken(token) as Token;       
     next(); 
   } catch (error) { 
     throw new AppError("Token inválido. Se autentique e tente novamente!", 401); 
   } 
 }