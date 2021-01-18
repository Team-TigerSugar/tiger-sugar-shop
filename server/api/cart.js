const router = require('express').Router()
const {Cart, Product, User, CartItem} = require('../db/models')
module.exports = router

//get a user's cart and items in it
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
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
        userId: req.params.userId
        /* sessionId: req.sessionID <-- this was creating a new cart everytime
        a seeded user added items to their cart, */
      }
    })

    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    //  console.log('****CART', cartItem)
    //  console.log('****CARTITEM.CARTID', cartItem.cartId)
    //  console.log('###QTY: ', cartItem.qty)

    res.json(cartItem)
  } catch (error) {
    next(error)
  }
})

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
        userId: req.params.userId
        /* sessionId: req.sessionID <-- this was creating a new cart everytime
        a seeded user added items to their cart on the website for the first time, */
      }
    })

    //  console.log('*******', cart)

    await cart.addProduct(product)
    res.send(product)
  } catch (error) {
    next(error)
  }
})
router.put('/plusOne/:userId/:itemId', async (req, res, next) => {
  try {
    console.log('#######$%&&UNwsss')
    const product = await Product.findByPk(req.params.itemId)

    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId
      }
    })
    //  console.log('*******', cart)
    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    //  console.log('^^^^CARTITEM: ', cartItem)
    console.log('%%%%CARTITEM.QTY : ', cartItem.qty)
    //console.log('&&&&&REQ.PARAMS.QTY : ', req.params.qty)
    const updatedTotalQty = cartItem.qty + 1
    console.log('$$$$$$CARTITEM: ', updatedTotalQty)
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
        userId: req.params.userId
      }
    })
    //  console.log('*******', cart)
    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    //  console.log('^^^^CARTITEM: ', cartItem)
    console.log('current CARTITEM.QTY : ', cartItem.qty)
    //console.log('&&&&&REQ.PARAMS.QTY : ', req.params.qty)
    let updatedTotalQty = cartItem.qty - 1
    if (updatedTotalQty <= 0) {
      updatedTotalQty = 0
      console.log('Updated CARTITEM QTY: ', updatedTotalQty)
      console.log(`${product.name} is about to be removed`)
      await cart.removeProduct(product)
      console.log('Succesfully removed')
    } else {
      console.log('$$$$$$CARTITEM QTY: ', updatedTotalQty)
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
        userId: req.params.userId
      }
    })
    //  console.log('*******', cart)
    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    console.log('^^^^CARTITEM: ', cartItem.dataValues)
    //  console.log('%%%%CARTITEM.QTY : ', cartItem.qty)
    //  console.log('&&&&&REQ.PARAMS.QTY : ', req.params.qty)
    const updatedTotalQty = cartItem.qty + Number(req.params.qty)
    //  console.log('$$$$$$CARTITEM: ', updatedTotalQty)
    await cart.addProduct(product, {through: {qty: req.params.qty}})
    res.send(product)
  } catch (error) {
    next(error)
  }
})

router.put('/:cartId/:itemId', async (req, res, next) => {
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
