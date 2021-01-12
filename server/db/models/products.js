const Sequelize = require('sequelize')
const db = require('./database')

const Products = db.define('product', {
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
  }
})

module.exports = Products
