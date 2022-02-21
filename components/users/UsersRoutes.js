const { Router } = require('express');
const router = new Router();
const isRegistered = require('../../utils/isRegistered');
const { register, login } = require('./UsersControllers');
const logger = require('../../utils/winston')

module.exports = (app) => {
  app.use('/user', router);


  /**
 * -------------- GET ROUTES ----------------
 */

  router.get('/registro', (req, res) => {
    logger.log('info', `ruta /registro, metodo get`);
    res.render('registro');
  });

  router.get('/login', (req, res) => {
    logger.log('info', `ruta /login, metodo get`);
    res.render('login');
  });



  /**
 * -------------- POST ROUTES ----------------
 */
  router.post('/registro', isRegistered, register);

  router.post('/login', login);

  
};
