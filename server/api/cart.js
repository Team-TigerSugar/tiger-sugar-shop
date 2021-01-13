const router = require('express').Router()
const {Cart, CartItem, Product} = require('../db/models')
module.exports = router

//get a user's cart and items in it
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId
      },
      include: CartItem
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/:itemId', async (req, res, next) => {
  try {
    //   const product = await Product.findO({where: {id: req.params.itemId}})
    const product = await Product.findByPk(req.params.itemId)
    const cart = await Cart.findOrCreate({
      //add session id? Figure it out
      where: {
        userId: req.params.userId
      }
    })
    //  let prdct = JSON.stringify(product)
    const cartItem = await CartItem.create({
      img: product.img,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    })
    console.log('IM A PRODUUUUUCCCTTTT', cartItem)
    await cart.addCartItem(cartItem)
    res.status(204).send(cart)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    await CartItem.destroy({where: {id: req.params.itemId}})
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
})
