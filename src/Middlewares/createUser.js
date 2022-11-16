const fs = require('fs').promises;
const path = require('path');

const db = path.resolve(__dirname, '..', 'talker.json');

const createUser = async (name, age, talk) => {
    const data = await fs.readFile(db, 'utf8');
    const users = JSON.parse(data);

    const id = users[users.length - 1].id + 1;
    const newUser = {
      id,
      name,
      age,
      talk,
    };
    users.push(newUser);
    await fs.writeFile(db, JSON.stringify(users, null, 2));
    return newUser;
};

module.exports = createUser;
