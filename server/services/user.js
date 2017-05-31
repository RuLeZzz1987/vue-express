import fs from 'mz/fs'
import path from 'path';

const usersPath = path.resolve(__dirname, '../models/users.json');

const readUsers = async () => {
  const usersJSON = await fs.readFile(usersPath);
  return JSON.parse(usersJSON);
};

export default {

  async getUsers (query={}) {
    try {
      const users = await readUsers();
      const ids = users.ids.filter(id => !Object.keys(query) || Object.keys(query).every(key => query[key] === users.list[id][key]));
      const list = Object.keys(users.list).reduce((items, item) => {
        if (ids.includes(users.list[item].id)) {
          items[item] = users.list[item];
        }
        return items;
      }, {});

      return {
        ids,
        list
      };

    } catch (e) {
      console.error(e);
      return {ids: [], list: {}};
    }
  },

  async addUser(user) {
    try {
      const users = await readUsers();
      users.nextId++;
      users.ids.push(users.nextId);
      users.list[users.nextId] = {...user, id: users.nextId};
      await fs.writeFile(usersPath, JSON.stringify(users));
      return users.nextId;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async updateUser(user) {
    try {
      const users = await readUsers();
      users.list[user.id] = user;
      await fs.writeFile(usersPath, JSON.stringify(users));
      return user.id;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  async removeUser(user) {
    try {
      const users = await readUsers();
      console.log(users);
      delete users.list[user.id];
      users.ids = users.ids.filter(id => id !== user.id);
      await fs.writeFile(usersPath, JSON.stringify(users));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

}
