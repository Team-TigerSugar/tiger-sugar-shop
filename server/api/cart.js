const router = require('express').Router()
const {Cart, Product, User, CartItem} = require('../db/models')
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

//get cartItem(qty) //api/cart/userId/itemId
router.get('/:userId/:itemId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)
    //creates cart if user has no cart
    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId
        /* sessionId: req.sessionID <-- this was creating a new cart everytime
        a seeded user added items to their cart, */
      }
    })

    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    console.log('****CART', cartItem)
    console.log('****CARTITEM.CARTID', cartItem.cartId)
    console.log('###QTY: ', cartItem.qty)

    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

//POST add to cart /api/cart/userId/itemId
router.post('/:userId/:itemId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)
    console.log('***********', product)

    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId
        /* sessionId: req.sessionID <-- this was creating a new cart everytime
        a seeded user added items to their cart on the website for the first time, */
      }
    })

    console.log('*******', cart)

    await cart.addProduct(product)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

//update cartItem /api/cart/:cartId/:itemId/:qty
router.put('/:userId/:itemId/:qty', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)

    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId
      }
    })

    console.log('*******', cart)

    await cart.addProduct(product, {through: {qty: req.params.qty}})
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
