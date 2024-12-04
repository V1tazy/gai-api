const express = require("express");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Разрешение CORS
app.use(cors());

// Или для более гибкой настройки (разрешение только с определенных источников)
app.use(cors({
  origin: "http://localhost:4000", // Укажите ваш клиентский URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Укажите разрешенные HTTP-методы
  credentials: true // Если вы используете куки
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

// Подключение к базе данных и запуск сервера
sequelize.sync({ force: false }).then(() => {
  console.log("База данных подключена.");
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });
});
