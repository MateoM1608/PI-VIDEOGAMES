const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const videogames = require('./videogames.js');
const genres = require('./genre.js');
const videogame = require('./videogame.js')

router.use('/videogame', videogame)
router.use('/videogames', videogames)
router.use('/genres', genres)


module.exports = router;
