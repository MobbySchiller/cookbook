const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const db = require("../models");
const Users = db.users;

const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_FROM = process.env.EMAIL_USER;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const generateToken = (payload, expiresIn = "1h") =>
  jwt.sign(payload, JWT_SECRET, { expiresIn });

exports.register = async (req, res) => {
  const { username, email, password, passwordRepeat } = req.body;
  if (password !== passwordRepeat) {
    return res.status(400).send({ message: "Hasła nie są takie same." });
  }
  try {
    const exists = await Users.findOne({ where: { email } });
    if (exists) return res.status(400).send({ message: "Email już istnieje." });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username,
      email,
      passwordHash,
      isVerified: false,
      guid: uuidv4(),
    });

    const emailToken = generateToken({ id: user.id }, "1d");
    const confirmLink = `${FRONTEND_URL}/account-activation?token=${emailToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_FROM,
        pass: process.env.EMAIL_APP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cookbook" <${EMAIL_FROM}>`,
      to: email,
      subject: "Potwierdź swój adres e-mail",
      html: `<p>Kliknij w link, aby aktywować konto: <a href="${confirmLink}">${confirmLink}</a></p>`,
    });

    res.status(201).send({
      message: "Rejestracja zakończona. Sprawdź e-mail, aby aktywować konto.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Błąd podczas rejestracji" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Users.findByPk(decoded.id);

    if (!user)
      return res.status(404).send({ message: "Nie znaleziono użytkownika." });
    if (user.isVerified)
      return res.send({ message: "Konto zostało już wcześniej aktywowane." });

    user.isVerified = true;
    await user.save();

    res.send({
      message: "Adres e-mail został potwierdzony. Możesz się zalogować.",
    });
  } catch (err) {
    res.status(400).send({ message: "Nieprawidłowy lub wygasły token." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user)
      return res.status(404).send({ message: "Nie znaleziono użytkownika." });

    if (!user.isVerified) {
      return res
        .status(403)
        .send({ message: "Najpierw potwierdź adres e-mail." });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      return res.status(401).send({ message: "Nieprawidłowe hasło." });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // tymczasowo dla dev - powinno być na true
      secure: false,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });

    res.send({
      message: "Zalogowano pomyślnie.",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Błąd podczas logowania." });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.send({ message: "Wylogowano." });
};

exports.current = async (req, res) => {
  try {
    const user = await Users.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "guid"],
    });

    if (!user) {
      return res.status(404).send({ message: "Użytkownik nie znaleziony." });
    }

    res.send({
      id: user.id,
      login: user.username,
      email: user.email,
      guid: user.guid,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Błąd serwera." });
  }
};
