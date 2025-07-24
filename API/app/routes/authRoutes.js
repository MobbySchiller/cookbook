module.exports = (app) => {
  const auth = require("../controllers/authController");
  const authMiddleware = require("../middlewares/auth");

  app.post("/api/register", auth.register);
  app.get("/api/verify-email", auth.verifyEmail);
  app.post("/api/login", auth.login);
  app.post("/api/logout", authMiddleware, auth.logout);
  app.post("/api/current", authMiddleware, auth.current);
};
