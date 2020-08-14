const { getResByQuery, getResByCountry } = require('../controllers')
const router = require('express').Router()

router.get('/getResByQuery', getResByQuery)
router.get('/getResByCountry', getResByCountry)

module.exports = router
