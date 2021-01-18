import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store'
import {compose} from 'redux'
import {getCartThunk, addToCartThunk, deleteFromCartThunk} from '../store/cart'
import {cartItemThunk} from '../store/cartItem'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import UpdateCart from './updateCart'

import tornPaperVert from '../../public/images/tornPaperVert.png'

const styles = theme => ({
  removeButt: {
    backgroundColor: theme.palette.common.colorTwo
  },
  otherButts: {
    backgroundColor: theme.palette.common.colorOne
  }
})

class Cart extends Component {
  constructor() {
    super()

    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getMe()
    } catch (err) {
      console.log(err)
    }
    const userId = this.props.user.id

    await this.props.getCart(userId)
    //  console.log('cart; ', this.props.cartItems)
  }

  async handleDelete(e) {
    e.preventDefault()
    const cartId = this.props.cart.id
    // const cart = this.props.cart
    const itemId = e.currentTarget.value
    //  console.log('itemId: ', itemId)
    try {
      await this.props.deleteFromCart(cartId, itemId)
      // await this.props.deleteFromCart(
      //   {...cart, products: cart.products.filter((p) => p.id !== itemId)},
      //   itemId
      // )
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    //   const cartItems = this.state.cartItems
    const isLoggedIn = this.props.user && Object.keys(this.props.user).length
    const cartHasItems = this.props.cartItems && this.props.cartItems.length
    // console.log('cartHasItems', cartHasItems)
    // console.log('cart items', this.state.cartItems)

    const {classes} = this.props
    if (this.props.cart) {
      console.log('cart', this.props.cart)
      return (
        <React.Fragment>
          <Grid container justify="center">
            {cartHasItems ? (
              <Typography variant="h1">Here are your Cart Items</Typography>
            ) : (
              <Typography variant="h1">No cart items!</Typography>
            )}
          </Grid>
          <Grid container>
            <Grid item container>
              <Grid item container>
                {this.props.cartItems &&
                  this.props.cartItems.map(item => (
                    <Grid key={item.id}>
                      <Grid item container>
                        <Grid item>
                          <img src={item.img} />
                        </Grid>
                        <Grid item container>
                          <Typography variant="body1">{item.name}</Typography>
                          <Typography variant="body2">
                            ${(item.price * 0.01).toFixed(2)}
                          </Typography>
                        </Grid>
                      </Grid>

                      <UpdateCart item={item} userId={this.props.user.id} />
                      <Button
                        type="submit"
                        onClick={this.handleDelete}
                        value={item.id}
                        className={classes.removeButt}
                      >
                        Remove
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid item container direction="column">
              <Link to="/products">
                <Button className={classes.otherButts} justify="center">
                  continue shopping
                </Button>
              </Link>

              <div>
                {(() => {
                  // if (!cartHasItems) return null
                  if (isLoggedIn)
                    return (
                      <Grid item container direction="column">
                        <Typography variant="body1">order summary</Typography>
                        <Link to="/checkout">
                          <Button className={classes.otherButts}>
                            checkout
                          </Button>
                        </Link>
                      </Grid>
                    )
                  else
                    return (
                      <Grid item container direction="column">
                        <Typography variant="body1">order summary</Typography>
                        <Link to="/checkoutmethods">
                          <Button className={classes.otherButts}>
                            checkout
                          </Button>
                        </Link>
                      </Grid>
                    )
                })()}
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      )
    } else {
      return 'oops'
    }
  }
}

const mapState = state => {
  return {
    cartItems: state.cart.products,
    cart: state.cart,
    user: state.user,
    qty: state.cartItem.qty
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(getCartThunk(userId)),
    addToCart: (userId, itemId, qty) =>
      dispatch(addToCartThunk(userId, itemId, qty)),
    deleteFromCart: (cartId, itemId) =>
      dispatch(deleteFromCartThunk(cartId, itemId)),
    getMe: () => dispatch(me()),
    getCartItem: (userId, itemId) => dispatch(cartItemThunk(userId, itemId))
  }
}

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(Cart)
