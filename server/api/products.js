const router = require('express').Router()
const {Product, Cart} = require('../db/models')
module.exports = router

//GET  all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.send(products)
  } catch (err) {
    next(err)
  }
})

//GET one product by id
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.send(product)
  } catch (err) {
    next(err)
  }
})

// update product
router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.update(req.body)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// delete product from database
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {id: req.params.productId}
    })
    res.sendStatus(204).end()
  } catch (error) {
    next(error)
  }
})
