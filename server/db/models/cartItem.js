const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  img: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  discount: {
    type: Sequelize.FLOAT
  }
})

module.exports = CartItem
