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
    type: Sequelize.FLOAT,
    //figure out how to deal with pennies using FLOAT + JS
    allowNull: false,
    validate: {
      notEmpty: true
      //no negative value
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
