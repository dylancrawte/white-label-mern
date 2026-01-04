"use server";

import User from "../../features/users/Model";
import { connectDB } from "../db";

export async function createUser(user: any) {
  try {
    await connectDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}