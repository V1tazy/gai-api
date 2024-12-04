const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/tokenUtils");

// Регистрация пользователя
const register = async (req, res) => {
    const { username, password, firstname, surname } = req.body;
  
    if (!firstname || !surname) {
      return res.status(400).json({ error: "Имя и фамилия обязательны" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        password: hashedPassword,
        firstname,
        surname,
      });
      res.status(201).json({ message: "Пользователь зарегистрирован", user });
    } catch (error) {
      res.status(400).json({ error: "Ошибка при регистрации пользователя" });
    }
  };
  

// Авторизация пользователя
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    const token = generateToken({ id: user.id, username: user.username });
    res.json({ message: "Успешная авторизация", token });
  } catch (error) {
    res.status(500).json({ error: "Ошибка на сервере" });
  }
};

// Профиль пользователя (защищенный роут)
const profile = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["id", "username", "firstname", "surname"],
      });
  
      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }
  
      res.json({
        message: "Добро пожаловать!",
        user,
      });
    } catch (error) {
      res.status(500).json({ error: "Ошибка на сервере" });
    }
  };
  

module.exports = { register, login, profile };
