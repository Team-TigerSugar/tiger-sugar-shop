const router = require('express').Router()
const {User, Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'billingInfo',
        'shippingInfo'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: Cart
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// edit/update user
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    await user.update(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// delete user
router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {id: req.params.userId}
    })
    res.sendStatus(204).end()
  } catch (error) {
    next(error)
  }
})
