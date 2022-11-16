// Status
const UNAUTH = 400;
const B_REQ = 401;

const nameCheck = (req, res, next) => {
    const { name } = req.body;

    if (!name) return res.status(UNAUTH).send({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
    return res.status(UNAUTH).send({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
    }
    next();
};
  
const checkAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) return res.status(UNAUTH).send({ message: 'O campo "age" é obrigatório' });
    if (age < 18) {
      return res.status(UNAUTH).send({ message: 'A pessoa palestrante deve ser maior de idade' }); 
    }
    next();
};

const checkToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
    if (authorization.length < 16 || typeof authorization !== 'string') {
      return res.status(B_REQ).send({ message: 'Token inválido' }); 
    }
    next();
};
  
const checkTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) return res.status(UNAUTH).send({ message: 'O campo "talk" é obrigatório' });
    next();
};
  
const checkWatchedAt = (req, res, next) => {
    const REGEX = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    const MSG = 'O campo "watchedAt" é obrigatório';
    const MSG2 = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

    const { watchedAt } = req.body.talk;
    if (!watchedAt) return res.status(UNAUTH).send({ message: MSG });
    if (!REGEX.test(watchedAt)) {
      return res.status(UNAUTH).send({ message: MSG2 }); 
    }
    next();
};
  
const checkRate = (req, res, next) => {
    const { rate } = req.body.talk;
    const check = [
      rate - Math.floor(rate) === 0,
      rate <= 5 && rate >= 1,
    ];
    
    if (!rate && rate !== 0) {
   return res.status(UNAUTH).send({ message: 'O campo "rate" é obrigatório' }); 
    }
    if (!check.every((element) => element)) {
      return res.status(UNAUTH).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
    }
    next();
};
  
module.exports = {
    nameCheck,
    checkAge,
    checkToken,
    checkTalk,
    checkWatchedAt,
    checkRate,
};
