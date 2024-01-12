import mongoose from "mongoose";

export const connectToMongoDB = async (DB_URL: string) => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log(err?.message ?? "Failed db connection");
    });
};
