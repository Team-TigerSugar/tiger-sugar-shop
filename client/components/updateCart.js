import React, {Component} from 'react'

// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store'
import {compose} from 'redux'
import {getCartThunk, addToCartThunk} from '../store/cart'
import {
  cartItemThunk,
  updateCartItemThunk,
  incrementCartItemThunk,
  decrementCartItemThunk
} from '../store/cartItem'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

//import tornPaperVert from '../../public/images/tornPaperVert.png'

const styles = theme => ({
  removeButt: {
    backgroundColor: theme.palette.common.colorTwo
  }
})

class UpdateCart extends Component {
  constructor() {
    super()
    this.state = {
      qty: 0
    }
    //this.handleChange = this.handleChange.bind(this)
    this.handleIncrementSubmit = this.handleIncrementSubmit.bind(this)
  }

  async componentDidMount() {
    try {
      const userId = this.props.userId
      console.log('Update UserId:', userId)
      const itemId = this.props.item.id
      console.log('Udpate ItemId:', itemId)
      await this.props.getCartItem(userId, itemId)

      //console.log('CART ITEM IN COMPONENT:', cartItem)
      this.setState({
        qty: this.props.qty
      })
    } catch (err) {
      console.log(err)
    }
    console.log('QTY: ', this.props.qty)
    const userId = this.props.user.id
    await this.props.getCart(userId)

    // console.log('cart; ', this.props.cartItems)
  }
  /* handleChange(event) {
    // event.preventDefault()

    this.setState({
      qty: event.currentTarget.value
    })
  } */

  async handleIncrementSubmit(event) {
    event.preventDefault()
    console.log('tttttyyu66yy', this.state)
    const userId = this.props.user.id
    const itemId = this.props.item.id
    const qty = this.state.qty
    console.log('this.state.qty: ', this.state.qty)
    await this.props.incrementCartItem(userId, itemId)
    await this.props.getCartItem(userId, itemId)
    this.setState({
      qty: this.props.qty
    })
  }

  render() {
    //   const cartItems = this.state.cartItems
    const {classes} = this.props
    return (
      <React.Fragment>
        <Grid container>
          <Grid item container>
            <Typography variant="body2">{this.state.qty}</Typography>
            {/* <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.qty}
                onChange={this.handleChange}
              /> */}
            <Button
              className={classes.Butt}
              type="submit"
              onClick={this.handleIncrementSubmit}
            >
              +
            </Button>
            {/*   </form> */}
          </Grid>
        </Grid>
      </React.Fragment>
    )
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
    getMe: () => dispatch(me()),
    getCartItem: (userId, itemId) => dispatch(cartItemThunk(userId, itemId)),
    updateCartItem: (userId, itemId, qty) =>
      dispatch(updateCartItemThunk(userId, itemId, qty)),
    incrementCartItem: (userId, itemId) =>
      dispatch(incrementCartItemThunk(userId, itemId))
  }
}

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(UpdateCart)
