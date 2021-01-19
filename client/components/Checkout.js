import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {me} from '../store'
import {getCartThunk, placeOrderThunk} from '../store/cart'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
  root: {
    maxWidth: 500,
    backgroundColor: theme.palette.common.colorThree,
    margin: 50,
    padding: 5
  },
  button: {
    backgroundColor: theme.palette.common.colorOne
  },
  margin: {
    margin: 20
  }
})

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.handleOrder = this.handleOrder.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getMe()
    } catch (err) {
      console.log(err)
    }

    await this.setState({
      cartItems: this.props.cartItems
    })
    const userId = this.props.user.id
    await this.props.getCart(userId)
    console.log('cart; ', this.props.cartItems)
  }

  async handleOrder(e) {
    e.preventDefault()
    const cartId = this.props.cart.id
    const userId = this.props.user.id
    try {
      await this.props.placeOrder(cartId, userId)
      this.props.history.push('/confirmorder')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {classes, addressLine1, addressLine2, city, state} = this.props
    const cartItemsPrices =
      this.props.cartItems && this.props.cartItems.map(item => item.price)
    const cartTotal =
      this.props.cartItems &&
      cartItemsPrices.reduce(function(a, b) {
        return a + b
      }, 0)
    const tax = cartTotal * 0.01 * 0.089
    console.log('tax', tax)

    return (
      <Grid container direction="column">
        <Grid item container direction="column" alignContent="center">
          <Typography variant="h1" className={classes.margin}>
            Ready to place your order?
          </Typography>
        </Grid>
        <Grid container direction="row" justify="center">
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h1" gutterBottom>
                Shipping Address
              </Typography>
              <Typography variant="body1">Address Line 1:</Typography>
              <Typography variant="body2">{addressLine1}</Typography>
              <Typography variant="body1">Address Line 2:</Typography>
              <Typography variant="body2">{addressLine2}</Typography>
              <Typography variant="body1">City:</Typography>
              <Typography variant="body2">{city}</Typography>
              <Typography variant="body1">State:</Typography>
              <Typography variant="body2">{state}</Typography>
            </CardContent>
            <CardActions className={classes.pos}>
              {/* edit button goes here */}
            </CardActions>
          </Card>

          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h1" gutterBottom>
                Order Summary
              </Typography>

              <Typography variant="body1">
                Items
                {this.props.cartItems &&
                  '.............' + this.props.cartItems.length}
              </Typography>
              <Typography variant="body1">
                Subtotal
                {this.props.cartItems &&
                  '........$' + (cartTotal * 0.01).toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Taxes
                {this.props.cartItems && '.............$' + tax.toFixed(2)}
              </Typography>
              <Typography variant="body1">Shipping........$5.00</Typography>
              <Typography variant="body1">
                Total
                {this.props.cartItems &&
                  '..............$' + (cartTotal * 0.01 + tax + 5).toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions className={classes.pos}>
              <Link to="/Cart">
                <Button>edit cart</Button>
              </Link>
            </CardActions>
          </Card>

          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h1" gutterBottom>
                Payment Information
              </Typography>
              <Typography variant="body1">Billing Address:</Typography>
              <Typography variant="body2">{addressLine1}</Typography>
              <Typography variant="body2">{addressLine2}</Typography>
              <Typography variant="body2">{city}</Typography>
              <Typography variant="body2">{state}</Typography>
              <Typography variant="body1">Payment Method:</Typography>
              <Typography variant="body2">Paypal</Typography>
            </CardContent>
            <CardActions className={classes.pos}>
              {/* <Link to="/Login">
              <Button>continue as guest</Button>
            </Link> */}
            </CardActions>
          </Card>
        </Grid>
        <Grid item container justify="flex-end">
          {/* placeholder link back to landing page for now */}

          <Button className={classes.button} onClick={this.handleOrder}>
            place order
          </Button>
        </Grid>
      </Grid>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart,
    cartItems: state.cart.products,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    addressLine1: state.user.addressLine1,
    addressLine2: state.user.addressLine2,
    city: state.user.city,
    state: state.user.state
  }
}

const mapDispatch = dispatch => {
  return {
    placeOrder: (cartId, userId) => dispatch(placeOrderThunk(cartId, userId)),
    getMe: () => dispatch(me()),
    getCart: userId => dispatch(getCartThunk(userId))
  }
}

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(Checkout)
