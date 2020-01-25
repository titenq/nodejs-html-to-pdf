const express = require('express');
const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');
const ejs = require('ejs');
const app = express();
const server = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', (req, res) => {
  res.render('index.html');
});

let saudacao = 'Hello World!';
let texto = 'Texto de exemplo para ser renderizado...';

/* let html = `
  <div style="text-align: center">
    <h1 style="color: #f00">Hello World!</h1>
    <hr>
    <p>Texto do parágrafo e acentuação.</p>
  </div>
`; */

let htmlWithFS = fs.readFileSync('./public/index.html', 'utf8');

let options = {
  format: 'A4',
  orientation: 'portrait',
  border: {
    top: '2cm',
    right: '2cm',
    bottom: '2cm',
    left: '2cm'
  }
};

let date = Date.now();

let pathFile = `./public/assets/pdf/${date}.pdf`;

/* ejs.renderFile('./index.ejs', {
  saudacao: saudacao,
  texto: texto
}, (err, html) => {
  if (err) {
    console.log(err);
  } else {
    pdf.create(html, options).toFile(path, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }
}); */

/* pdf.create(html, options).toFile(path, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
}); */

pdf.create(htmlWithFS, options).toFile(pathFile, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
