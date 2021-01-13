const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET  /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.send(products)
  } catch (err) {
    next(err)
  }
})
