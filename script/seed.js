'use strict'

const db = require('../server/db')
const {User, Cart} = require('../server/db/models')

const users = [
  {
    firstName: 'Deloba',
    lastName: 'Shapland',
    email: 'dobie@aol.com',
    password: 'woofw00f47',
    isAdmin: true
  },
  {
    firstName: 'Percy',
    lastName: 'Rivera',
    email: 'kittybaby@hotmail.com',
    password: 'meow'
  },
  {
    firstName: 'Lizzie',
    lastName: 'Stover',
    email: 'babyheadlizzie@yahoo.com',
    password: 'mealworm',
    isAdmin: true
  },
  {
    firstName: 'Andy',
    lastName: 'Manalo',
    email: 'andy@puppies.com',
    password: 'iLuvtr3ats',
    isAdmin: true
  },
  {
    firstName: 'Lola',
    lastName: 'Nefores',
    email: 'lola@yahoo.com',
    password: 'hiLola97'
  }
]

const products = [
  {
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7pFy3DaXkAo_1nq2NhQcSiisDZpHN9YjcQ&usqp=CAU',
    name: `Justin Bieber's Sweat`,
    price: 20
  },
  {
    img:
      'https://i.pinimg.com/236x/a9/e8/1e/a9e81e5feed2cc716f777d3380badc92--essential-oils-homemade-hair.jpg',
    name: `Kim Kardashian's Tears`,
    price: 30
  },
  {
    img:
      'https://www.gannett-cdn.com/-mm-/606a139d72980f1cad6e124238ba8a6f01e32f2a/c=17-0-692-900/local/-/media/2015/02/10/12thandbroad/12thandbroad/635591575784138321-original-etched-apothecary-bottle-love-potion-no9.jpg?quality=50&width=640',
    name: 'Love Potion ',
    price: 50
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(users.map(user => User.create(user)))

  const panda = await User.create({
    firstName: 'Panda',
    lastName: 'Shadow',
    email: 'lilpandie@aol.com',
    password: 'whaDDup',
    shippingInfo: '312 Gingerbread Lane',
    billingInfo: '312 Gingerbread Lane'
  })

  const pandaCart = await Cart.create({
    sessionId: 1,
    firstName: 'Panda',
    lastName: 'Shadow',
    email: 'lilpandie@aol.com',
    addressLine1: '312 Gingerbread Lane',
    addressLine2: 'apartment 1',
    city: 'Boston',
    state: 'MA'
  })
  await pandaCart.setUser(panda)

  console.log(`seeded ${users.length} users`)

  await Promise.all(products.map(product => Product.create(product)))
  console.log(`seeded ${products.length} products`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
