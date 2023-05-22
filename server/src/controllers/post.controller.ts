import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/post.model";
import { postValidate } from "../utils/validatior.utils";

async function getAllMeetings(req: Request, res: Response, next: NextFunction) {
  try {
    // fetch all meetings
    const posts = await Post.find();
    return res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
}

async function addMeeting(req: Request, res: Response, next: NextFunction) {
  try {
    const { post_title, post_desc, post_link } = req.body;

    const { error } = postValidate.validate(req.body);

    if (error) {
      return res.status(422).send(error.details[0]);
    }

    // save post(meeting)
    await Post.create<IPost>({
      post_desc,
      post_link,
      post_title,
    })
      .then(() => res.status(201).send("Meeting added!"))
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    next(error);
  }
}

export { getAllMeetings, addMeeting };
