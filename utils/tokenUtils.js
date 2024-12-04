const jwt = require("jsonwebtoken");
const SECRET_KEY = "supersecretkey"; // Используйте более безопасное значение в .env файле

// Генерация токена
const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

// Проверка токена
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
