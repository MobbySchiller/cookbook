module.exports = (app) => {
  const auth = require("../controllers/authController");

  app.post("/api/register", auth.register);
  app.get("/api/verify-email", auth.verifyEmail);
  app.post("/api/login", auth.login);
};
