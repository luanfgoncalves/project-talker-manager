const fs = require('fs').promises;
const path = require('path');

const db = path.resolve(__dirname, '..', 'talker.json');

const getUser = async (id) => {
    const data = await fs.readFile(db, 'utf8');
    const users = JSON.parse(data);

    const user = users.find((talker) => +talker.id === +id);
    return user;
  };

module.exports = getUser;
