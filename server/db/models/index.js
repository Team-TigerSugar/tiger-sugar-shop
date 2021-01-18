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

//user has many orders
//order should have a bool to determine if it's a cart
//product should have a bool option to determine if it's a cartItem
//once an order has been placed, it'll trigger (checkout button) a through table for order history
//if a guest is checking out, only adjust the product qty, and don't associate the guest with the order

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Cart,
  Product,
  CartItem
}
