import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Members from "../models/Members";

// Load environment variables
dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

// Function to verify token and return a user object
async function findUserByToken(token: string) {
  try {
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload; // JwtPayload is the correct type

    if (!decoded || typeof decoded !== "object" || !decoded.email) {
      throw new Error("Invalid token payload");
    }

    const { email } = decoded;
    // Replace this with actual DB lookup
    const user = await Members.getMember(email);

    return user || null; // Return `null` if user is not found
  } catch (error) {
    return null; // Return `null` for invalid token
  }
}

// Define Passport Bearer Strategy
passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const user = await findUserByToken(token);
      if (!user) {
        return done(null, false); // Return false for unauthorized user
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
