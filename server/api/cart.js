const router = require('express').Router()
const {Cart, CartItem, Product, User} = require('../db/models')
module.exports = router

// //get a user's cart and items in it
// router.get('/:userId', async (req, res, next) => {
//   try {
//     const cart = await Cart.findOne({
//       where: {
//         userId: req.params.userId
//       },
//       include: CartItem
//     })
//     res.json(cart)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/:userId/:itemId', async (req, res, next) => {
//   try {
//     const product = await Product.findOne({where: {id: req.params.itemId}})

//     //  const product = await Product.findByPk(req.params.itemId)
//     console.log('***********', product)
//     //  const user = await User.findByPk(req.params.userId)
//     const cart = await Cart.findOrCreate({
//       where: {
//         userId: req.params.userId,
//         sessionId: req.sessionID
//       }
//     })

//     const cartItem = await CartItem.create({
//       img: product.img,
//       name: product.name,
//       price: product.price,
//       quantity: product.quantity
//     })

//     //  await cart.setUser(user)
//     await cart.addCartItem(cartItem)
//     res.sendStatus(204).send(cartItem)
//   } catch (error) {
//     console.log(error)
//   }
// })

// router.delete('/:itemId', async (req, res, next) => {
//   try {
//     await CartItem.destroy({where: {id: req.params.itemId}})
//     res.sendStatus(204)
//   } catch (error) {
//     console.log(error)
//   }
// })
