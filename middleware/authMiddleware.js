const { verifyToken } = require("../utils/tokenUtils");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Необходим токен авторизации" });
  }

  try {
    req.user = verifyToken(token); // Расшифрованный пользовательский payload
    next();
  } catch (error) {
    res.status(401).json({ error: "Неверный токен" });
  }
};

module.exports = authMiddleware;
