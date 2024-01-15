import config from "../config";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { LoginInfo } from "../interface/userInterface";
import { decode } from "punycode";

declare global {
  namespace Express {
    interface Request {
      userData?: any; 
    }
  }
}

// interface DecodedToken {
//   email: string;
//   id: number;
// }
export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.body.userId;
  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const decodedToken = jwt.verify(authHeader, config.ACCESS_TOKEN_KEY);
    req.userData = decodedToken
    next()
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ message: "Token verification failed" });
  }
}

export async function authenticateTokenParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if(typeof req.params.id === 'string'){
    const authHeader = req.params.id;
    if (!authHeader) {
      return res.status(401).json({ message: "Access Denied" });
    }
    try {
      const decodedToken = jwt.verify(authHeader, config.ACCESS_TOKEN_KEY);
      req.userData = decodedToken
      next()
    } catch (error) {
      console.error("Token Verification Error:", error);
      return res.status(401).json({ message: "Token verification failed" });
    }
  }
  else{
    const idArray = req.params.ids.split(",");
    const userId = idArray[1];
    // console.log(userId);
    const authHeader = userId;
    if (!authHeader) {
      return res.status(401).json({ message: "Access Denied" });
    }
    try {
      const decodedToken = jwt.verify(authHeader, config.ACCESS_TOKEN_KEY);
      req.userData = decodedToken
      next()
    } catch (error) {
      console.error("Token Verification Error:", error);
      return res.status(401).json({ message: "Token verification failed" });
    }
  }
}

export const generateAccessToken = (user: object) => {
  return jwt.sign(user, config.ACCESS_TOKEN_KEY);
};

// FOR REFRESH TOKEN
// export const generateRefreshToken = (user: object) => {
//   return jwt.sign(user, config.REFRESH_TOKEN_KEY, { expiresIn: "365d" }); // Expires in 1 year
// };

// let refreshTokenArray: any[] = [];
// export async function pushIntoRefresh(refresh: string) {
//   await refreshTokenArray.push(refresh);
// }

// export async function refreshActionToken(req: Request, res: Response) {
//   const refreshToken = req.body.token;
//   // console.log(refreshToken);
//   // console.log(refreshTokenArray);
//   if (refreshToken === null || !refreshTokenArray.includes(refreshToken)) {
//     return res.json({ message: "No refresh token" }); // Return a single response for invalid token or absence
//   }

//   try {
//     const decoded = (await jwt.verify(
//       refreshToken,
//       config.REFRESH_TOKEN_KEY
//     )) as DecodedToken;
//     const userData = { email: decoded.email, id: decoded.id };

//     const accessToken = generateAccessToken(userData);
//     res.json({ accessToken });
//   } catch (err) {
//     res.sendStatus(403).json({ message: "No" }); // Handle verification errors
//   }
// }
