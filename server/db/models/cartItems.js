const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const CartItem = db.define('cartItems', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 100,
      min: 0
    },
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER
  }
})

CartItem.afterSave(async cartItemInstance => {
  const product = await Product.findByPk(cartItemInstance.productId)
  console.log('cart item hook product', product)
  const price = product.price
  cartItemInstance.price = price
  await cartItemInstance.save()
})

module.exports = CartItem
