const { Router } = require('express')

const router = Router()

const {getGenres} = require('../controller/Genres')

router.get('/', getGenres)

module.exports = router