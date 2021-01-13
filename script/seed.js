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
