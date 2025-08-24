const bcrypt = require('bcryptjs');

const users = [
  { username: 'Lucas',
    password: bcrypt.hashSync('123456', 8), 
    favorecidos: ['test'],
    saldo: 5000
  }

]

module.exports = {
  users,  
};