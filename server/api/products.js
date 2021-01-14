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
    const product = await Product.findByPk(
      req.params.productId //, {
      // include: Cart,
      //} I commented out this code because the cart association is keeping
      //the SingleProduct component from rendering. Hopefully once we add more
      //Cart->Product data to the seed file we'll be able to add this code back in
      //without any problems.
    )
    res.send(product)
  } catch (err) {
    next(err)
  }
})
