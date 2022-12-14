// Requisições de módulos:
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Routes/appRouter');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
const HTTP_OK_STATUS = 200;
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
// ------------------------------------------------------

app.use('/', router);

app.listen(PORT, () => {
  console.log('Online');
});
