import axios from 'axios'

//ACTION TYPES
const GET_CART_ITEM = 'GET_CART_ITEM'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
const SUM_OF_CART_ITEM = 'SUM_OF_CART_ITEM'
const INCREMENT_CART_ITEM = 'INCREMENT_CART_ITEM'
const DECREMENT_CART_ITEM = 'DECREMENT_CART_ITEM'
//ACTION CREATORS
const getCartItem = cartItem => ({
  type: GET_CART_ITEM,
  cartItem
})

const updateCartItem = cartItem => ({
  type: UPDATE_CART_ITEM,
  cartItem
})

const sumOfCartItem = cartItem => ({
  SUM_OF_CART_ITEM,
  cartItem
})
const incrementCartItem = cartItem => ({
  type: INCREMENT_CART_ITEM,
  cartItem
})
const decrementCartItem = cartItem => ({
  type: DECREMENT_CART_ITEM,
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

export const sumOfCartItemThunk = (userId, itemId, qty) => async dispatch => {
  try {
    const cartItem = await axios.post(
      `/api/cart/sum/${userId}/${itemId}/${qty}`
    )
    console.log('SUM of CartItem from redux:', cartItem.data)
    dispatch(sumOfCartItem(cartItem.data))
  } catch (err) {
    console.log(err)
  }
}

export const incrementCartItemThunk = (userId, itemId) => async dispatch => {
  try {
    const cartItem = await axios.put(`/api/cart/plusOne/${userId}/${itemId}`)
    console.log('INCREMENTED CartItem from redux:', cartItem.data)
    dispatch(incrementCartItem(cartItem.data))
  } catch (err) {
    console.log(err)
  }
}

export const decrementCartItemThunk = (userId, itemId) => async dispatch => {
  try {
    const cartItem = await axios.put(`/api/cart/minusOne/${userId}/${itemId}`)
    console.log('INCREMENTED CartItem from redux:', cartItem.data)
    dispatch(decrementCartItem(cartItem.data))
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
    case SUM_OF_CART_ITEM:
      return action.cartItem
    case INCREMENT_CART_ITEM:
      return action.cartItem
    case DECREMENT_CART_ITEM:
      return action.cartItem
    default:
      return state
  }
}
