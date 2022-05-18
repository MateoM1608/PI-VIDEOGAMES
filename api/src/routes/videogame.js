const { Router } = require('express');

const router = Router();

const { getVideogame } = require('../controller/getVideogame')
const { createVideogame, deleteVideogame } = require('../controller/createVideogame')



router.get('/:id' , getVideogame)
router.post('/', createVideogame)
router.delete('/:id', deleteVideogame)



module.exports = router