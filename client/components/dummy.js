import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, me} from '../store'
import {compose} from 'redux'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// import tornPaperVert from '../../public/images/tornPaperVert.png'

const styles = theme => ({
  toolbar: {
    paddingTop: '1em',
    paddingBottom: '1em'
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '2em'
  },
  navbar: {
    backgroundColor: theme.palette.common.colorWhite
  },
  tabsCont: {
    marginLeft: '9em'
  },
  tab: {
    ...theme.typography.tab
  },
  tabs2: {
    ...theme.typography.tab,
    marginLeft: '66em',
    [theme.breakpoints.down('md')]: {
      marginLeft: '20em',
      color: 'fff'
    }
  },
  cartButtonImg: {
    width: '4em'
  }
})

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      cartItems: []
    }
    this.handleDelete = this.handleDelete.bind(this)
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
    console.log('cart; ', this.props.cart)
  }

  async handleDelete(e) {
    e.preventDefault()
    const cartId = this.props.cart.id
    const itemId = e.target.value
    console.log('itemId: ', itemId)
    try {
      await this.props.deleteFromCart(cartId, itemId)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    //   const cartItems = this.state.cartItems

    return (
      <React.Fragment>
        <Grid container>
          {this.props.cartItems.length ? (
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
                  <div key={item.id}>
                    <ul>
                      <img src={item.img} />
                      <li>{item.name}</li>
                      <li>{item.price}</li>
                    </ul>
                    <button
                      type="submit"
                      onClick={this.handleDelete}
                      value={item.id}
                    >
                      Remove
                    </button>
                  </div>
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
