import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../helpers/environment";

export type UserTokenVerified = {
    id: string;
    isRefreshToken: boolean;
};

const verify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization!!.split(" ")[1];
        const userTokenVerified = jwt.verify(token, TOKEN_SECRET) as UserTokenVerified;

        if (userTokenVerified.isRefreshToken)
            res.status(401).json({
                error: 1,
                message: "invalid token",
            });
        else {
            req.userTokenVerified = userTokenVerified;
            next();
        }
    } catch (e: any) {
        res.status(401).json({
            error: 1,
            message: "invalid token",
        });
    }
};

const verifyForRefresh = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization!!.split(" ")[1];
        const userTokenVerified = jwt.verify(token, TOKEN_SECRET) as UserTokenVerified;

        if (!userTokenVerified.isRefreshToken)
            res.status(401).json({
                error: 1,
                message: "invalid token",
            });
        else {
            req.userTokenVerified = userTokenVerified;
            next();
        }
    } catch (e: any) {
        res.status(401).json({
            error: 1,
            message: "invalid token",
        });
    }
};

export default {
    verify: verify,
    verifyForRefresh: verifyForRefresh,
};
