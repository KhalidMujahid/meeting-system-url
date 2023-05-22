import { Router } from "express";
import { testRoute, userAttendMeeting} from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.get("/", testRoute);

//user attend meeting
userRouter.post("/attend/create", userAttendMeeting);

export default userRouter;
