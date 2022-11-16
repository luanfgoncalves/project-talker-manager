const fs = require('fs').promises;
const path = require('path');

const db = path.resolve(__dirname, '..', 'talker.json');

const deleteUser = async (id) => {
    const data = await fs.readFile(db, 'utf8');
    const users = JSON.parse(data);

    const newUsers = users.filter((talker) => +talker.id !== +id); 
    await fs.writeFile(db, JSON.stringify(newUsers, null, 2));
};

module.exports = deleteUser;
