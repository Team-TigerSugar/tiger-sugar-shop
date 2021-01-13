const router = require('express').Router()
const {Product, Cart} = require('../db/models')
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

//GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: Cart
    })
    res.send(product)
  } catch (err) {
    next(err)
  }
})
