function emailValidation(req, res, next) {
    const { email, password } = req.body;
    const regex = /^\w+@[a-z]+\.[a-z]+$/;
    const B_REQ = 400;
    if (!email) {
        return res.status(B_REQ).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!regex.test(email)) {
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
}

module.exports = emailValidation;
