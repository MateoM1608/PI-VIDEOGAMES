const { Router } = require('express');

const router = Router();

const { getAllVideogames } = require('../controller/getAllVideogames');

router.get('/', getAllVideogames)

module.exports = router
