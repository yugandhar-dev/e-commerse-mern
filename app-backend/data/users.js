import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Steven Rogers',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Thor Odinson',
    email: 'thor@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Edward Stark',
    email: 'stark@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
