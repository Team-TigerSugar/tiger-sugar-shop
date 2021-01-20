import axios from 'axios'

//ACTION TYPES
const GET_GUEST_CART = 'GET_GUEST_CART'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const DELETE_FROM_GUEST_CART = 'DELETE_FROM_GUEST_CART'
const PLACE_GUEST_ORDER = 'PLACE_GUEST_ORDER'

//INITAIL STATE
const defaultState = localStorage.setItem(
  'localCart',
  JSON.stringify({products: []})
)

//ACTION CREATORS
const getGuestCart = cart => ({
  type: GET_GUEST_CART,
  cart
})

const addToGuestCart = product => ({
  type: ADD_TO_GUEST_CART,
  product
})

const deleteFromGuestCart = productId => ({
  type: DELETE_FROM_GUEST_CART,
  productId
})

const placeGuestOrder = (cart, newCart) => ({
  type: PLACE_GUEST_ORDER,
  cart,
  newCart
})

//THUNK CREATORS
export const getGuestCartThunk = () => async dispatch => {
  try {
    const cart = JSON.parse(localStorage.getItem('localCart'))
    dispatch(getGuestCart(cart))
  } catch (error) {
    console.log(error)
  }
}

export const addToGuestCartThunk = (userId, itemId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/${userId}/${itemId}`)
    dispatch(addToGuestCart(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteFromGuestCartThunk = (cartId, itemId) => async dispatch => {
  try {
    await axios.delete(`/api/cart/${cartId}/${itemId}`)
    dispatch(deleteFromGuestCart(itemId))
  } catch (error) {
    console.log(error)
  }
}

export const placeGuestOrderThunk = (cartId, userId) => async dispatch => {
  try {
    const cart = await axios.put(`/api/cart/${cartId}`)
    const newCart = await axios.post(`/api/cart/${userId}`)
    dispatch(placeGuestOrder(cart, newCart))
  } catch (error) {
    console.log(error)
  }
}

//REDUCER
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_GUEST_CART:
      return action.cart
    case ADD_TO_GUEST_CART:
      return {...state, products: [...state.products, action.product]}
    case DELETE_FROM_GUEST_CART:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      }
    case PLACE_GUEST_ORDER:
      return action.newCart
    default:
      return state
  }
}
