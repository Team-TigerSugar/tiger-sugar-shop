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
  button: {
    backgroundColor: theme.palette.common.colorTwo,
    borderRadius: '50%',
    width: '1em',
    height: '4.5em'
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
    this.handleDecrementSubmit = this.handleDecrementSubmit.bind(this)
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
  }

  async handleIncrementSubmit(event) {
    event.preventDefault()
    const userId = this.props.user.id
    const itemId = this.props.item.id
    console.log('this.state.qty: ', this.state.qty)
    await this.props.incrementCartItem(userId, itemId)
    await this.props.getCartItem(userId, itemId)
    this.setState({
      qty: this.props.qty
    })
    //     location.reload()
  }
  async handleDecrementSubmit(event) {
    event.preventDefault()
    const userId = this.props.user.id
    const itemId = this.props.item.id

    await this.props.decrementCartItem(userId, itemId)
    await this.props.getCartItem(userId, itemId)
    console.log('DECREMENTthis.state.qty: ', this.state.qty)
    this.setState({
      qty: this.props.qty
    })
    //     location.reload()
  }

  render() {
    //   const cartItems = this.state.cartItems
    const {classes} = this.props
    return (
      <React.Fragment>
        <Grid container>
          <Grid item container alignItems="center">
            <Button
              className={classes.DecrementButton}
              type="submit"
              onClick={this.handleDecrementSubmit}
              classes={{root: classes.button}}
            >
              <Typography variant="button" display="block">
                {' '}
                -{' '}
              </Typography>
            </Button>
            <Typography
              variant="body2"
              display="block"
              style={{marginLeft: '1em', marginRight: '1em'}}
            >
              Qty: {this.state.qty}
            </Typography>

            <Button
              className={classes.IncrementButton}
              type="submit"
              onClick={this.handleIncrementSubmit}
              classes={{root: classes.button}}
            >
              <Typography variant="button" display="block" gutterBottom>
                {'   '}+{'   '}
              </Typography>
            </Button>
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
      dispatch(incrementCartItemThunk(userId, itemId)),
    decrementCartItem: (userId, itemId) =>
      dispatch(decrementCartItemThunk(userId, itemId))
  }
}

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(UpdateCart)
