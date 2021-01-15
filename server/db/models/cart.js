const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //   firstName: {
  //     type: Sequelize.STRING
  //   },
  //   lastName: {
  //     type: Sequelize.STRING
  //   },
  //   email: {
  //     type: Sequelize.STRING,
  //     unique: true,
  //     validate: {
  //       isEmail: true
  //     }
  //   },
  //   addressLine1: {
  //     type: Sequelize.STRING
  //   },
  //   addressLine2: {
  //     type: Sequelize.STRING
  //   },
  //   city: {
  //     type: Sequelize.STRING
  //   },
  //   state: {
  //     //dropdown list?
  //     type: Sequelize.STRING
  //   },
  //   zipCode: {
  //     type: Sequelize.INTEGER,
  //     validate: {
  //       //might not work
  //       len: [5]
  //     }
  //   },
  isOrder: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Cart
