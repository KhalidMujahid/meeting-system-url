import { Schema, model, Document } from "mongoose";

export interface IPost {
  post_title: string;
  post_desc: string;
  post_link: string;
}

export interface IPostDoc extends IPost, Document {}

const obj = {
  type: String,
  required: true,
  trim: true,
};

const PostSchema: Schema<IPostDoc> = new Schema<IPostDoc>(
  {
    post_title: obj,
    post_desc: obj,
    post_link: obj,
  },
  { timestamps: true }
);

const Post = model<IPostDoc>("Post", PostSchema);

export default Post;
