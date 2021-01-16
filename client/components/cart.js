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
  },
  otherButts: {
    backgroundColor: theme.palette.common.colorThree
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
    console.log('cart; ', this.props.cartItems)
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
            <Link to="/products">
              <Button className={classes.otherButts}>continue shopping</Button>
            </Link>
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

// ==============================================================================

// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {getCartThunk, addToCartThunk, deleteFromCartThunk} from '../store/cart'
// import {me} from '../store/user'

// class Cart extends Component {
//   constructor() {
//     super()
//     this.state = {
//       cartItems: []
//     }
//     this.handleDelete = this.handleDelete.bind(this)
//   }
//   async componentDidMount() {
//     try {
//       await this.props.getMe()
//     } catch (err) {
//       console.log(err)
//     }

//     await this.setState({
//       cartItems: this.props.cartItems
//     })
//     const userId = this.props.user.id
//     await this.props.getCart(userId)
//     console.log('cart; ', this.props.cart)
//   }
//   async handleDelete(e) {
//     e.preventDefault()
//     const cartId = this.props.cart.id
//     const itemId = e.target.value
//     console.log('itemId: ', itemId)
//     try {
//       await this.props.deleteFromCart(cartId, itemId)
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   render() {
//     const cartItems = this.state.cartItems
//     console.log('cartItems: ', cartItems)
//     const prices = cartItems.filter(item => item.price)
//     console.log('prices: ', prices)
//     let total = prices.reduce((a, b) => a + b)
//     return (
//       <div>
//         <h1>CART</h1>
//         <div>
//      {this.props.cartItems &&
//             this.props.cartItems.map(item => (
//               <div key={item.id}>
//                 <ul>
//                   <img src={item.img} />
//                   <li>{item.name}</li>
//                   <li>{item.price}</li>
//                 </ul>
//                 <button
//                   type="submit"
//                   onClick={this.handleDelete}
//                   value={item.id}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//         </div>
//         <h3>Total</h3>
//         <div>{total}</div>
//       </div>
//     )
//   }
// }

// const mapState = state => {
//   return {
//     cartItems: state.cart.products,
//     cart: state.cart,
//     user: state.user
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getCart: userId => dispatch(getCartThunk(userId)),
//     addToCart: (userId, itemId) => dispatch(addToCartThunk(userId, itemId)),
//     deleteFromCart: (cartId, itemId) =>
//       dispatch(deleteFromCartThunk(cartId, itemId)),
//     getMe: () => dispatch(me())
//   }
// }

// export default connect(mapState, mapDispatch)(Cart)

//add an inCart column to Products
//if inCart === true, display it in the cart!
/*  this.state = {
      // eslint-disable-next-line react/no-unused-state
      userType: 'Guest',
    } */
