// 4 - Adicione as validações para o endpoint /login 

const userValidation = (req, res, next) => {
    const { email, password } = req.body;
    const REGEX = /^\w+@[a-z]+\.[a-z]+$/;
    const B_REQ = 400;
    if (!email) {
        return res.status(B_REQ).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!REGEX.test(email)) {
        return res.status(B_REQ).json(
            { message: 'O "email" deve ter o formato "email@email.com"' },
        );
    }
    if (!password) {
        return res.status(B_REQ).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(B_REQ).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

module.exports = userValidation;
