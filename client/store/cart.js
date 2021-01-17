import axios from 'axios'

//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const PLACE_ORDER = 'PLACE_ORDER'

//INITAIL STATE
const defaultState = {products: []}
//maybe items should be an array?

//ACTION CREATORS
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

const deleteFromCart = productId => ({
  type: DELETE_FROM_CART,
  productId
})

const placeOrder = (cart, newCart) => ({
  type: PLACE_ORDER,
  cart,
  newCart
})

//THUNK CREATORS
export const getCartThunk = userId => async dispatch => {
  try {
    const cart = await axios.get(`/api/cart/${userId}`)
    //  console.log('%%%%%%%$$$', cart.data)
    dispatch(getCart(cart.data))
  } catch (error) {
    console.log(error)
  }
}

export const addToCartThunk = (userId, itemId) => async dispatch => {
  try {
    const cartItem = await axios.post(`/api/cart/${userId}/${itemId}`)
    dispatch(addToCart(cartItem.data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteFromCartThunk = (cartId, itemId) => async dispatch => {
  try {
    await axios.put(`/api/cart/${cartId}/${itemId}`)
    dispatch(deleteFromCart(itemId))
  } catch (error) {
    console.log(error)
  }
}

export const placeOrderThunk = (cartId, userId) => async dispatch => {
  try {
    const cart = await axios.put(`/api/cart/${cartId}`)
    const newCart = await axios.post(`/api/cart/${userId}`)
    dispatch(placeOrder(cart, newCart))
  } catch (error) {
    console.log(error)
  }
}

//REDUCER

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART:
      let newArr = state.products.push(action.product)
      return {...state, products: newArr}
    case DELETE_FROM_CART:
      return state.products.filter(product => product.id !== action.productId)
    case PLACE_ORDER:
      return action.newCart
    default:
      return state
  }
}
