const router = require('express').Router()
const {User, Cart} = require('../db/models')
module.exports = router

//see every user's info as an admin
router.get('/admin/:userId', async (req, res, next) => {
  const currentUser = await User.findByPk(req.params.userId)
  try {
    if (currentUser.isAdmin) {
      const users = await User.findAll({
        attributes: [
          'id',
          'email',
          'firstName',
          'lastName',
          'addressLine1',
          'addressLine2',
          'city',
          'state'
        ]
      })

      res.json(users)
    } else {
      res.send(404)
    }
  } catch (error) {
    next(error)
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
