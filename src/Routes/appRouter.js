// Requisições de módulos:
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

// Imports de Middlewares
const token = require('../Middlewares/token');
const userValidation = require('../Middlewares/userValidation');
const createUser = require('../Middlewares/createUser');
const { nameCheck, checkAge, checkToken, checkTalk, checkWatchedAt, 
    checkRate } = require('../Middlewares/registValidation');
const deleteUser = require('../Middlewares/deleteUser');

// Imports de Helpers
const getUser = require('../helpers/getUser');
const updateUser = require('../Middlewares/updateUser');

// Status
const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
// const FORBIDDEN = 403;
const NOT_FOUND = 404;
// const INTERNAL_ERROR = 500;

const appRouter = express.Router();
const db = path.resolve(__dirname, '..', 'talker.json');

// 1 - Crie o endpoint GET /talker
appRouter.get('/talker', async (req, res) => {
    // const db = path.resolve(__dirname, '..', 'talker.json');
    const data = await fs.readFile(db, 'utf-8');
    const dataJson = JSON.parse(data);
    res.status(OK).json(dataJson);
});

// 2 - Crie o endpoint GET /talker/:id
appRouter.get('/talker/:id', async (req, res) => {
    const data = await fs.readFile(db, 'utf-8');
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
appRouter.post('/login', userValidation, (req, res) => {
    res.status(OK).json(token());
});

// 4 - Adicione as validações para o endpoint /login ---------------------

// 5 - Crie o endpoint POST /talker

appRouter.post('/talker', checkToken, nameCheck, checkAge, checkTalk, checkWatchedAt, 
    checkRate, async (req, res) => {
    const { name, age, talk } = req.body;
    const result = await createUser(name, age, talk);
    res.status(CREATED).json(result);
});

// 6 - Crie o endpoint PUT /talker/:id

appRouter.put('/talker/:id', checkToken, nameCheck, checkAge, checkTalk, checkWatchedAt, 
    checkRate, async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const user = await getUser(id);
    if (!user) return res.status(404).send({ message: 'Talker not found' });
    const talker = await updateUser(id, name, age, talk);

    res.status(OK).json(talker);
});

// 7 - Crie o endpoint DELETE /talker/:id - OK
// const deleteUser = require('../Middlewares/deleteUser');

appRouter.delete('/talker/:id', checkToken, async (req, res) => {
    const { id } = req.params;
    await deleteUser(id);
    res.status(NO_CONTENT).end();
});

// 8 - Crie o endpoint GET /talker/search?q=searchTerm

module.exports = appRouter;
