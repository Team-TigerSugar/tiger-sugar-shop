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

import cartSummary from './../../public/images/cartSummary.png'

const styles = theme => ({
  removeButt: {
    backgroundColor: theme.palette.common.colorTwo,
    textTransform: 'none',
    fontFamily: 'Lato',
    marginTop: '1em'
  },
  otherButts: {
    backgroundColor: theme.palette.common.colorOne
  },
  summary: {
    backgroundImage: `url(${cartSummary})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-reapeat',
    width: '30%',
    marginLeft: '15em'
  }
})

class Cart extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    try {
      await this.props.getMe()
    } catch (err) {
      console.log(err)
    }
    const userId = this.props.user.id
    if (!userId) {
      // try gettign local cart
      // if there is no local cart, create a new, empty cart
      await localStorage.setItem('localCart', {products: []})
    } else {
      await this.props.getCart(userId)
    }
  }

  render() {
    //   const cartItems = this.state.cartItems
    const isLoggedIn = this.props.user && Object.keys(this.props.user).length
    const cartHasItems = this.props.cartItems && this.props.cartItems.length

    const {classes} = this.props
    if (this.props.cart) {
      console.log('cart', this.props.cart)
      return (
        <React.Fragment>
          <Grid container>
            <Grid container justify="center">
              {cartHasItems ? (
                <Typography variant="h1">Here are your Cart Items</Typography>
              ) : (
                <Typography variant="h1">No cart items!</Typography>
              )}
            </Grid>
            <Grid container direction="row">
              <Grid item container style={{width: '50%'}}>
                <Grid item container direction="column" style={{width: '100'}}>
                  {this.props.cartItems &&
                    this.props.cartItems.map(item => (
                      <Grid key={item.id}>
                        <Grid
                          item
                          container
                          alignItems="center"
                          style={{marginTop: '4em', marginLeft: '6em'}}
                        >
                          <Grid item>
                            <img className="browsingImg" src={item.img} />
                          </Grid>
                          <Grid item style={{marginLeft: '2em'}}>
                            <Typography variant="body1">{item.name}</Typography>
                            <Typography variant="body2">
                              ${(item.price * 0.01).toFixed(2)}
                            </Typography>
                            <Button
                              type="submit"
                              onClick={() =>
                                this.props.deleteFromCart(
                                  this.props.cart.id,
                                  item.id
                                )
                              }
                              value={item.id}
                              classes={{root: classes.removeButt}}
                            >
                              Remove
                            </Button>
                          </Grid>
                          <Grid item style={{marginLeft: 'auto'}}>
                            <UpdateCart
                              item={item}
                              userId={this.props.user.id}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <Grid
                item
                container
                direction="column"
                alignContent="center"
                className={classes.summary}
              >
                <Link to="/products">
                  <Button className={classes.otherButts} justify="center">
                    continue shopping
                  </Button>
                </Link>

                <div>
                  {(() => {
                    if (!cartHasItems) return null
                    if (isLoggedIn)
                      return (
                        <Grid
                          item
                          container
                          direction="column"
                          alignContent="center"
                        >
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
