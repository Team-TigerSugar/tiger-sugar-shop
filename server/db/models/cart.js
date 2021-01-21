const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  sessionId: {
    type: Sequelize.STRING
  },
  isOrder: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Cart
