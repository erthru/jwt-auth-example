import { Router } from "express";
import * as userController from "./controllers/user-controller";
import verifyUserToken from "./middlewares/verify-user-token";

const router = Router();

router.get("/user/profile", verifyUserToken.verify, userController.profile);
router.post("/user", userController.add);
router.post("/user/generate/token", userController.generateToken);
router.post("/user/generate/refresh-token", verifyUserToken.verifyForRefresh, userController.generateRefreshToken);

export default router;
