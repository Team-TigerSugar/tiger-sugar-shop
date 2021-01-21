/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Product = db.model('product')
const Cart = db.model('cart')

//user test
describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        id: 2
      })
    })

    //  it('GET /api/users', async () => {
    //    const res = await request(app)
    //      .get('/api/users')
    //      .expect(200)

    //    expect(res.body).to.be.an('array')
    //    expect(res.body[0].email).to.be.equal(codysEmail)
    //  })
    it('GET /api/users/:userId', async () => {
      const res = await request(app)
        .get('/api/users/2')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

//product test
describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const productName = 'Used Tissue'

    beforeEach(() => {
      return Product.create({
        name: productName,
        price: 300,
        id: 1
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(productName)
    })
    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(productName)
    })
    it('DELETE /api/products/:productId', async () => {
      await request(app)
        .delete('/api/products/1')
        .expect(204)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

// //cart test
// describe('Cart routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/cart/', () => {
//     const userId = 4

//     beforeEach(() => {
//       return Cart.create({
//         userId: userId,
//         isOrder: false,
//       })
//     })

//     it('GET /api/cart/:userId', async () => {
//       const res = await request(app).get('/api/cart/4').expect(200)

//       expect(res.body).to.be.an('object')
//       expect(res.body.userId).to.be.equal(userId)
//     })
//   }) // end describe('/api/users')
// }) // end describe('User routes')
