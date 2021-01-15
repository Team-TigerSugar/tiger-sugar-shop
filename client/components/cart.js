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
    try {
      await this.props.getMe()
    } catch (err) {
      console.log(err)
    }

    /*   await this.setState({
      userId: this.props.user.id,
    }) */
    const userId = this.props.user.id
    await this.props.getCart(userId)
    console.log(this.props.cartItems)
  }
  render() {
    return (
      <div>
        <h1>CART</h1>
        <div>
          {this.props.cartItems &&
            this.props.cartItems.map(item => (
              <div key={item.id}>
                <ul>
                  <img src={item.img} />
                  <li>{item.name}</li>
                  <li>{item.price}</li>
                </ul>
                <button type="submit">Remove</button>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cart.products,
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
