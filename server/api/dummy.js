///Made a dummy file to refactor code
// /api/cart/:cartId/:itemId
router.post('/:cartId/:itemId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)
    console.log('***********', product)
    //const user = await User.findByPk(req.params.userId)
    const [cart] = await Cart.findOrCreate({
      where: {
        cartId: req.params.cartId,
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
    //console.log('**8*****product: ', product)
    //await cart[0].setUser(user)
    await cart.addProduct(product)
    res.send(product)
  } catch (error) {
    next(error)
  }
})

// /api/cart/:cartId/:itemId
router.post('/:cartId/:userId/:itemId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.itemId)
    console.log('***********', product)
    //const user = await User.findByPk(req.params.userId)
    const [cart] = await Cart.findOrCreate({
      where: {
        cartId: req.params.cartId,
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
    //console.log('**8*****product: ', product)
    //await cart[0].setUser(user)
    await cart.addProduct(product)
    res.send(product)
  } catch (error) {
    next(error)
  }
})
