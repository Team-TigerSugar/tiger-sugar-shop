import axios from 'axios'

const GET_CART_ITEMS = 'GET_CART_ITEMS'

export const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  cartItems
})

export const fetchCartItems = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/cartItems/${userId}`)
    dispatch(getCartItems(data))
  } catch (err) {
    console.log(err)
  }
}

const intialState = []

const cartItemsReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartItems
    default:
      return state
  }
}
export default cartItemsReducer
