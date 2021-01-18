const router = require('express').Router()
const {Cart, Product, User, CartItem} = require('../db/models')
module.exports = router

//get a user's cart and items in it
router.get('/:userId', async (req, res, next) => {
  try {
    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        sessionId: req.sessionID,
        isOrder: false
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
        userId: req.params.userId,
        isOrder: false
      }
    })
    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

//makes a replacement cart when someone places an order
router.post('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.create({
      userId: req.params.userId,
      sessionId: req.sessionID,
      isOrder: false
    })
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

//POST add to cart /api/cart/userId/itemId
router.post('/:userId/:itemId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)
    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        isOrder: false
      }
    })
    await cart.addProduct(product)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

router.put('/plusOne/:userId/:itemId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)

    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        isOrder: false
      }
    })
    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    const updatedTotalQty = cartItem.qty + 1
    await cart.addProduct(product, {through: {qty: updatedTotalQty}})
    res.send(product)
  } catch (error) {
    next(error)
  }
})

router.put('/minusOne/:userId/:itemId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)

    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        isOrder: false
      }
    })
    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })

    let updatedTotalQty = cartItem.qty - 1
    if (updatedTotalQty <= 0) {
      updatedTotalQty = 0
      await cart.removeProduct(product)
    } else {
      await cart.addProduct(product, {through: {qty: updatedTotalQty}})
    }
    res.send(product)
  } catch (error) {
    next(error)
  }
})

//update cartItem /api/cart/:userId/:itemId/:qty
router.put('/:userId/:itemId/:qty', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)

    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        isOrder: false
      }
    })
    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    //  const updatedTotalQty = cartItem.qty + Number(req.params.qty)
    await cart.addProduct(product, {through: {qty: req.params.qty}})
    res.send(product)
  } catch (error) {
    next(error)
  }
})

//remove product from cart
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

router.put('/:cartId', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.cartId)
    cart.isOrder = true
    await cart.save()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
