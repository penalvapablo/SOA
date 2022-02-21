const productTestController = require('../components/productTest/ProductTestRoutes');
const authenticateToken = require('../utils/authenticateToken')
const info = require('../components/info')
const apiRandom = require('../components/api-randoms')
const logger = require('../utils/winston')
const Users = require('../components/users/UsersRoutes')

let user = ''

module.exports = (app) => {
  productTestController(app);
  Users(app)

  info(app)
  apiRandom(app)
  
  // ARREGLAR VALIDACION JWT
  // app.get('/',(req,res)=>{
  //   const user = req.user
  //   console.log({user})
  //   if (req.user === '') {
  //     return res.redirect('login')
  //   } 
  //   res.render('index', {user })
  // })


    // ARREGLAR VALIDACION JWT
    app.get('/',(req,res)=>{
    res.render('index')
  })


  app.get('/logout', (req, res) => {
    req.session.destroy()
    res.render('logout');
  });

  app.get('*', (req, res)=>{
    logger.log('warn', `ruta inexistente`)
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} método get no implementado`,
    })
  })
};
