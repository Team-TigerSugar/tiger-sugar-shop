const router = require('express').Router()
// const {default: user} = require('../../client/store/user')
const {Cart, Product, User, CartItem} = require('../db/models')
module.exports = router

//get every user's order history info as an admin
router.get('/admin/:userId', async (req, res, next) => {
  const currentUser = await User.findByPk(req.params.userId)
  try {
    if (currentUser.isAdmin) {
      const orders = await Cart.findAll({include: Product})
      res.json(orders)
    } else {
      res.send(404)
    }
  } catch (error) {
    next(error)
  }
})

//get user's own personal order history
router.get('/myorders/:userId', async (req, res, next) => {
  try {
    const orders = await Cart.findAll({
      where: {
        userId: req.params.userId,
        isOrder: true
      },
      include: Product,
      CartItem
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

//get all cart items associated with a user's current cart
router.get('/cartItems/:userId', async (req, res, next) => {
  try {
    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        isOrder: false
      },
      include: {
        all: true
      }
    })
    const cartItems = await CartItem.findAll({
      where: {
        cartId: cart.id
      }
    })
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

//get a user's cart and items in it
router.get('/:userId', async (req, res, next) => {
  try {
    const [cart] = await Cart.findOrCreate({
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

    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })

    if (cartItem) {
      const updatedTotalQty = cartItem.qty + 1

      await cart.addProduct(product, {through: {qty: updatedTotalQty}})
    } else {
      await cart.addProduct(product, {through: {qty: 1}})
    }

    res.send(product)
  } catch (error) {
    next(error)
  }
})

//adding input to qty
//POST /api/cart/sum/:userId/:itemId
router.post('/sum/:userId/:itemId/:qty', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)
    const [cart] = await Cart.findOrCreate({
      where: {
        userId: req.params.userId,
        isOrder: false
      }
    })
    //console.log('CART', cart.dataValues)
    const cartItem = await CartItem.findOne({
      where: {cartId: cart.id, productId: product.id}
    })
    //console.log('-------', cartItem)
    if (cartItem) {
      //console.log('cartitem.qty:', cartItem.qty)

      const updatedTotalQty = cartItem.qty + Number(req.params.qty)
      //console.log('UPDATEDQTY:', updatedTotalQty)
      await cart.addProduct(product, {through: {qty: updatedTotalQty}})
    } else {
      await cart.addProduct(product, {through: {qty: Number(req.params.qty)}})
    }

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
      updatedTotalQty = 1
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

    const updatedTotalQty = cartItem.qty + Number(req.params.qty)

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
