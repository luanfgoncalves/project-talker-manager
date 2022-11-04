const token = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let index = 0; index < 16; index += 1) {
        result += characters.charAt(Math.floor(Math.random() * 16));
    }
    console.log(`Sua chave é: ${result}`);
    console.log(`Cumprimento da chave: ${result.length}`);
    return { token: result };
};

module.exports = token;

// Referencia: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
