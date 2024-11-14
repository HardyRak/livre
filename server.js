const express = require('express');
const connectDB = require('./database');
const livreCtrl=require("./controleur/livreControleur");
const cors = require('cors'); 
const app = express();
const path=require('path');

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api', livreCtrl);

app.use(express.static(path.join(__dirname,'front')));

app.listen(3000, () => {
  console.log('Serveur en ecoute sur le port 3000');
});