const express = require('express');
const cors = require('cors'); /** ВЫДАЧА РАЗРЕШЕНИЙ НА РЕДИРЕКТ */
const app = express();

// Разрешаем CORS
app.use(cors());
// Чтобы парсить JSON в запросах
app.use(express.json());


app.post('/move', (req, res) => {
  console.log('Текущий ход:', req.body.data);
  res.json({ message: 'Данные move', received: req.body });

});
app.post('/win', (req, res) => {
  console.log('Победил:', req.body.data);
  res.json({ message: 'Данные win', received: req.body });
});

app.post('/draw', (req, res) => {
  console.log('Ничья.');
 ;
});
/*
app.post('/start', (req, res) => {
  console.log('Игра начата заново!');
  res.json({ message: 'Игра сброшена' });
});*/


app.listen(4000, () => {
  console.log('Сервер запущен на http://localhost:4000/');
});
