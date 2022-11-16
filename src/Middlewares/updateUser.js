const fs = require('fs').promises;
const path = require('path');

const db = path.resolve(__dirname, '..', 'talker.json');
const getUser = require('../helpers/getUser');

const updateUser = async (id, name, age, talk) => {
    const user = await getUser(id);

    const data = await fs.readFile(db, 'utf8');
    const users = JSON.parse(data);

    const newUsers = users.filter((talker) => +talker.id !== +id);
    const updatedUser = {
      ...user,
      name,
      age,
      talk,
    };
    newUsers.push(updatedUser);
    await fs.writeFile(db, JSON.stringify(newUsers, null, 2));
    return updatedUser;
};

module.exports = updateUser;
