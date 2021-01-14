const User = require('./user')
const Cart = require('./cart')
const Product = require('./product')
const CartItem = require('./cartItem')

User.hasMany(Cart)
Cart.belongsTo(User)

User.belongsToMany(Product, {through: 'UserProducts'})
Product.belongsToMany(User, {through: 'UserProducts'})

//this Product->CartItem association causes problems with
//rendering the AllProducts and SingleProduct view
// Product.belongsToMany(CartItem, {through: 'ProductsInCart'})
// CartItem.hasOne(Product)

Cart.belongsToMany(Product, {through: 'cartItems2'})
Product.belongsToMany(Cart, {through: 'cartItems2'})

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
