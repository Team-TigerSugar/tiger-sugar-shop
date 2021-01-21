import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {me} from '../store'
import {compose} from 'redux'
import {getCartThunk, addToCartThunk, deleteFromCartThunk} from '../store/cart'
import {cartItemThunk} from '../store/cartItem'
import {fetchCartItems} from '../store/allCartItems'

import Footer from './Footer'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import UpdateCart from './updateCart'
import CardContent from '@material-ui/core/CardContent'

import cartSummary from './../../public/images/cartSummary.png'

const styles = theme => ({
  removeButt: {
    backgroundColor: theme.palette.common.colorTwo,
    textTransform: 'none',
    fontFamily: 'Lato',
    marginTop: '1em'
  },
  otherButts: {
    backgroundColor: theme.palette.common.colorTwo,
    textTransform: 'none',
    fontFamily: 'Lato'
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
    await this.props.getCart(userId)

    try {
      await this.props.getCartItems(userId)
    } catch (err) {
      console.log(err)
    }

    await this.setState({
      cartItems: this.props.cartItems
    })
  }

  render() {
    const isLoggedIn = this.props.user && Object.keys(this.props.user).length
    const cartHasItems = this.props.cartItems && this.props.cartItems.length
    const {classes, items, cartItems} = this.props

    const cartItemsPrices =
      this.props.cart.products &&
      this.props.cart.products.map(item => item.price)
    const cartItemsQtys =
      this.props.cart.products && cartItems.map(item => item.qty)
    const reducer = (accumulator, currentValue) => accumulator + currentValue

    let cartTotal
    if (cartItemsPrices && cartItemsQtys) {
      let sum = 0
      for (let i = 0; i < cartItemsQtys.length; i++) {
        sum += cartItemsQtys[i] * cartItemsPrices[i]
      }
      cartTotal = sum
    }

    const tax = cartTotal * 0.01 * 0.089

    const totalNumItems =
      this.props.cart.products && cartItemsQtys.reduce(reducer, 0)

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
            <Grid container direction="row" style={{marginTop: '5em'}}>
              <Grid item container style={{width: '50%'}}>
                <Grid item container direction="column" style={{width: '100'}}>
                  {items &&
                    items.map(item => (
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
                <Grid
                  item
                  container
                  justify="center"
                  style={{marginTop: '8em', marginLeft: '2em'}}
                >
                  <Grid className={classes.root}>
                    <CardContent>
                      <Typography variant="body1" gutterBottom>
                        Order Summary
                      </Typography>

                      <Typography
                        variant="body2"
                        style={{marginTop: '3em', marginBottom: '1em'}}
                      >
                        Items
                        {this.props.cart.products &&
                          '.............' + totalNumItems}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{marginTop: '1em', marginBottom: '1em'}}
                      >
                        Subtotal
                        {this.props.cart.products &&
                          '........$' + (cartTotal * 0.01).toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{marginTop: '1em', marginBottom: '1em'}}
                      >
                        Taxes
                        {this.props.cart.products &&
                          '.............$' + tax.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{marginTop: '1em', marginBottom: '1em'}}
                      >
                        Shipping........$5.00
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{marginTop: '3em', marginBottom: '1em'}}
                      >
                        Total
                        {this.props.cart.products &&
                          '..............$' +
                            (cartTotal * 0.01 + tax + 5).toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Link to="/products">
                    <Button
                      className={classes.otherButts}
                      justify="center"
                      style={{marginLeft: '12em'}}
                    >
                      continue shopping
                    </Button>
                  </Link>

                  <div>
                    {(() => {
                      if (!cartHasItems) return null
                      if (isLoggedIn)
                        return (
                          <Grid item container alignItems="center">
                            <Link to="/checkout">
                              <Button
                                classes={{root: classes.otherButts}}
                                style={{marginLeft: '1em'}}
                              >
                                checkout
                              </Button>
                            </Link>
                          </Grid>
                        )
                      else
                        return (
                          <Grid item container direction="column">
                            <Typography variant="body1">
                              order summary
                            </Typography>
                            <Link to="/checkoutmethods">
                              <Button
                                classes={{root: classes.otherButts}}
                                style={{marginLeft: '1em'}}
                              >
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
            <Footer />
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
    user: state.user,
    cart: state.cart,
    cartItems: state.allCartItems,
    items: state.cart.products,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    addressLine1: state.user.addressLine1,
    addressLine2: state.user.addressLine2,
    city: state.user.city,
    state: state.user.state,
    qty: state.cartItem.qty,
    cartItem: state.cartItem
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
    getCartItem: (userId, itemId) => dispatch(cartItemThunk(userId, itemId)),
    getCartItems: userId => dispatch(fetchCartItems(userId))
  }
}

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(Cart)
