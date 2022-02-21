const bcrypt = require('bcrypt');
const logger = require('../../utils/winston');
const Users = require('./UsersSchema');const jwt = require('jsonwebtoken')
const PRIVATE_KEY = "myprivatekey";


const encryptPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error('error', `problem encrypting password: ${error}`);
  }
};

const createAndSaveUser = async (mail, hashedPassword) => {
  try {
    const newUser = {
      mail: mail,
      password: hashedPassword,
    };
    await Users.create(newUser);
  } catch (error) {
    logger.error('error', `problem creating and saving user: ${error}`);
  }
};

const validateUser = async (mail, password, res) =>{
  const user = await Users.find({ mail: mail });
  const confirmPassword = await bcrypt.compare(password, user[0].password);
  if (!confirmPassword) {
    return res.render('login-error');
  }
  return user
}

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: '10m' });
  console.log({token})
  return token;
}


module.exports = {
  encryptPassword,
  createAndSaveUser,
  validateUser,
  generateToken
};
