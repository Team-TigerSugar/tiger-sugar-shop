import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store'
import {compose} from 'redux'
import {getCartThunk, addToCartThunk, deleteFromCartThunk} from '../store/cart'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import tornPaperVert from '../../public/images/tornPaperVert.png'

const styles = theme => ({
  removeButt: {
    backgroundColor: theme.palette.common.colorTwo
  }
})

class Cart extends Component {
  constructor() {
    super()
    //  this.state = {
    //    cartItems: []
    //  }
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.getMe()
    } catch (err) {
      console.log(err)
    }
    //  await this.setState({
    //    cartItems: this.props.cartItems
    //  })
    console.log('PROOOOOOPS', this.props)
    const userId = this.props.user.id
    await this.props.getCart(userId)
    console.log('cart; ', this.props.cartItems)
  }

  async handleDelete(e) {
    e.preventDefault()
    const cartId = this.props.cart.id
    const itemId = e.currentTarget.value
    console.log('itemId: ', itemId)
    try {
      await this.props.deleteFromCart(cartId, itemId)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    //   const cartItems = this.state.cartItems
    const {classes} = this.props
    return (
      <React.Fragment>
        <Grid container justify="center">
          {this.props.cartItems && this.props.cartItems.length ? (
            <Typography variant="h1">Here are your Cart Items</Typography>
          ) : (
            <Typography variant="h1">No cart items! Get shoppin!</Typography>
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
                        <Typography variant="body2">${item.price}</Typography>
                      </Grid>
                    </Grid>

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
            <Typography variant="body1">order summary</Typography>
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
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(getCartThunk(userId)),
    addToCart: (userId, itemId) => dispatch(addToCartThunk(userId, itemId)),
    deleteFromCart: (cartId, itemId) =>
      dispatch(deleteFromCartThunk(cartId, itemId)),
    getMe: () => dispatch(me())
  }
}

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(Cart)
