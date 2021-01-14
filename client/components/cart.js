import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk, addToCartThunk, deleteFromCartThunk} from '../store/cart'
import {me} from '../store/user'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      userId: 0
    }
  }
  async componentDidMount() {
    //this.props.getCart()
    // this.props.getMe()
    try {
      const user = await this.props.getMe()
      await console.log('**********', this.props.user)
    } catch (err) {
      console.log(err)
    }

    /*   await this.setState({
      userId: user.id,
    })
    console.log(this.state.userId) */
  }
  render() {
    return (
      <div>
        <h1>CART</h1>
        {/* <div>
          {this.props.cartItems.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cart.items,
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

export default connect(mapState, mapDispatch)(Cart)

//add an inCart column to Products
//if inCart === true, display it in the cart!
/*  this.state = {
      // eslint-disable-next-line react/no-unused-state
      userType: 'Guest',
    } */
