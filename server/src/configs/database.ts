import mongoose from "mongoose";

async function connectDB() {
  const url: string | undefined =
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_DB
      : process.env.PRODUCTION_DB;
  await mongoose.connect(url || "");
}

export { connectDB };
