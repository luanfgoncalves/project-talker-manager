// Requisições de módulos:
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

// Imports de Middlewares
const token = require('../Middlewares/token');
const emailValidation = require('../Middlewares/emailValidation');

// Status
const OK = 200;
// const CREATED = 201;
// const FORBIDDEN = 403;
const NOT_FOUND = 404;
// const INTERNAL_ERROR = 500;

const appRouter = express.Router();
const dataPath = path.resolve(__dirname, '..', 'talker.json');

// 1 - Crie o endpoint GET /talker
appRouter.get('/talker', async (req, res) => {
    // const dataPath = path.resolve(__dirname, '..', 'talker.json');
    const data = await fs.readFile(dataPath, 'utf-8');
    const dataJson = JSON.parse(data);
    res.status(OK).json(dataJson);
});

// 2 - Crie o endpoint GET /talker/:id
appRouter.get('/talker/:id', async (req, res) => {
    const data = await fs.readFile(dataPath, 'utf-8');
    const dataJson = JSON.parse(data);
    const param = req.params.id;
    // const findId = (element) => element.id === Number(param);
    const result = dataJson.find((element) => element.id === Number(param));
    if (!result) {
        return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
    res.status(OK).json(result);
});

// 3 - Crie o endpoint POST /login  |  // 4 - Adicione as validações para o endpoint /login
appRouter.post('/login', emailValidation, (req, res) => {
    res.status(OK).json(token());
});

module.exports = appRouter;
