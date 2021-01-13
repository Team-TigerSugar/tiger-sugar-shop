const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

//get a user's cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.body.userId
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
