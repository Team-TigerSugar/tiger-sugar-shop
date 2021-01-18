const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
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
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  isCartItem: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  discount: {
    type: Sequelize.FLOAT
  }
})

module.exports = Product
