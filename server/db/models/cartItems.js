const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItems', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 100,
      min: 0
    },
    defaultValue: 1
  }
})

module.exports = CartItem
