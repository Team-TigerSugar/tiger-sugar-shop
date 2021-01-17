const router = require('express').Router()
const {Cart, Product, User} = require('../db/models')
module.exports = router

//get a user's cart and items in it
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId
      },
      include: Product
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/:itemId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)
    //  console.log('***********', product)
    //const user = await User.findByPk(req.params.userId)
    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        sessionId: req.sessionID
      }
    })
    /* const cart = await Cart.create({
      where: {
        userId: req.params.userId,
        sessionId: req.sessionID,
      },
    }) */
    console.log('*******', cart)
    console.log('**8*****product: ', product)
    //await cart[0].setUser(user)
    await cart.addProduct(product)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

router.delete('/:cartId/:itemId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId)
    const product = await Product.findByPk(req.params.itemId)
    await cart.removeProduct(product)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
