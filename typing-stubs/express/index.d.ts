import "express";
import { UserTokenVerified } from "../../middlewares/verify-user-token";

declare global {
    namespace Express {
        interface Request {
            userTokenVerified: UserTokenVerified;
        }
    }
}
