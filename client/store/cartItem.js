import axios from 'axios'

//ACTION TYPES
const GET_CART_ITEM = 'GET_CART_ITEM'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
//ACTION CREATORS
const getCartItem = cartItem => ({
  type: GET_CART_ITEM,
  cartItem
})

const updateCartItem = cartItem => ({
  type: UPDATE_CART_ITEM,
  cartItem
})

const initialState = {}
//THUNK CREATORS
//make thunk to get cartItem (qty)
export const cartItemThunk = (userId, itemId) => async dispatch => {
  try {
    const cartItem = await axios.get(`/api/cart/${userId}/${itemId}`)
    console.log('CartItem from redux:', cartItem.data)
    dispatch(getCartItem(cartItem.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateCartItemThunk = (userId, itemId, qty) => async dispatch => {
  try {
    const cartItem = await axios.put(`/api/cart/${userId}/${itemId}/${qty}`)
    console.log('UDPDATED CartItem from redux:', cartItem.data)
    dispatch(updateCartItem(cartItem.data))
  } catch (err) {
    console.log(err)
  }
}

//SUB-REDUCER --cartItem is an object
export default function cartItemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEM:
      return action.cartItem
    case UPDATE_CART_ITEM:
      return action.cartItem
    default:
      return state
  }
}
