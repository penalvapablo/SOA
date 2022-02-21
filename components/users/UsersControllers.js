const logger = require('../../utils/winston');
const {
  encryptPassword,
  createAndSaveUser,
  validateUser,
  generateToken
} = require('./UsersServices');

const register = async (req, res) => {
  const { mail, password } = req.body;
  try {
    createAndSaveUser(mail, await encryptPassword(password));
    res.redirect('login');
  } catch (error) {
    logger.log('error', `register error: ${error}`);
  }
};

const login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    const user = await validateUser(mail, password, res);
    const access_token = generateToken(user);
    res.cookie(access_token);
    res.redirect('/');

  } catch (error) {
    logger.log('error', `login error: ${error}`);
  }
};

module.exports = { register, login };
