import passport from "../config/passport";

// Middleware to protect routes
export const authenticateUser = passport.authenticate("bearer", {
  session: false,
});
