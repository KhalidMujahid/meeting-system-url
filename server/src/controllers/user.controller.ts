import { NextFunction, Request, Response } from "express";
import Post, { IPost } from "../models/post.model";
import User, { IUser } from "../models/user.model";
import { userValidate } from "../utils/validatior.utils";
import nodemailer from "nodemailer";

function testRoute(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).send("Hello world");
  } catch (error) {
    next(error);
  }
}

const mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

async function userAttendMeeting(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fname, lname, email, phone, link } = req.body;

    const { error } = userValidate.validate(req.body);

    if (error) {
      return res.status(422).send(error.details[0].message);
    }

    // check if the link exits
    const checkIfLinkExit: IPost | null = await Post.findOne<IPost>({
      post_link: link,
    });

    if (!checkIfLinkExit) return res.status(404).send("Invalid link!");

    await User.create<IUser>({
      first_name: fname,
      last_name: lname,
      email,
      phone_number: phone,
      meeting_link: link,
    })
      .then(() => {
        mail
          .sendMail({
            from: "binkhalid267@gmail.com",
            to: email,
            subject: "Meeting link",
            html: `<p>Meeting link ${link}</p>`,
          })
          .then(() => {
            res
              .status(201)
              .send(`Meeting link has been sent to your ${email}..`);
          });
      })
      .catch((error: Error) => {
        res.status(400).send(error.message);
      })
      .catch((error: Error) => res.status(400).send(error.message));
  } catch (error) {
    next(error);
  }
}

export { testRoute, userAttendMeeting };
