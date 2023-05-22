import { Router } from "express";
import { addMeeting, getAllMeetings } from "../controllers/post.controller";

const postRouter: Router = Router();

// get all meeting posts
postRouter.get("/posts", getAllMeetings);

// add post
postRouter.post("/post/create", addMeeting);

export default postRouter;
