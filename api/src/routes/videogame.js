const { Router } = require('express');

const router = Router();

const { getVideogame } = require('../controller/getVideogame')
const { createVideogame } = require('../controller/createVideogame')


router.get('/:id' , getVideogame)
router.post('/', createVideogame)



module.exports = router