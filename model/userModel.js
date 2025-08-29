const bcrypt = require('bcryptjs');

const users = [
  { username: 'Lucas',
    password: bcrypt.hashSync('123456', 8), 
    favorecidos: ['test', 'Maria'],
    saldo: 5000
  },
  {
    username: 'Maria',
    password: bcrypt.hashSync('abcdef', 8),
    favorecidos: [], 
    saldo: 3000 
  }


]

module.exports = {
  users,  
};