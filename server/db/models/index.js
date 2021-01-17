const User = require('./user')
const Cart = require('./cart')
const Product = require('./product')
const CartItem = require('./cartItems')

User.hasMany(Cart)
Cart.belongsTo(User)

User.belongsToMany(Product, {through: 'UserProducts'})
Product.belongsToMany(User, {through: 'UserProducts'})

Cart.belongsToMany(Product, {through: 'cartItems'})
Product.belongsToMany(Cart, {through: 'cartItems'})

module.exports = {
  User,
  Cart,
  Product,
  CartItem
}
