const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Photo = require('./models/Photo');

const app = express();

// connect DB
mongoose.connect(
  'mongodb+srv://eraykeskin:eray123@cluster0.2he0g.mongodb.net/pcat-test-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', { photos: photos });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  Photo.create(req.body);
  res.redirect('/');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
