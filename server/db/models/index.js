const User = require('./user')
const Cart = require('./cart')
const Product = require('./products')

User.belongsTo(Cart)
Cart.hasOne(User)

Product.belongsToMany(Cart, {
  through: 'ProductsInCart',
  foreignKey: 'productId'
})

Cart.belongsToMany(Product, {
  through: 'ProductsInCart',
  foreignKey: 'cartId'
})

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
  Product
}
