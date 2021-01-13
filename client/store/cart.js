import axios from 'axios'

//ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

//INITAIL STATE
const defaultState = {}
//maybe items should be an array?

//ACTION CREATORS
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

const deleteFromCart = () => ({
  type: DELETE_FROM_CART
})

//THUNK CREATORS
export const getCartThunk = userId => async dispatch => {
  try {
    const cart = await axios.get(`/api/catr/${userId}`)
    dispatch(getCart(cart.data))
  } catch (error) {
    console.log(error)
  }
}
//REDUCER

export default function(state = defaultState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, items: action.item}
    //fix this!
    case DELETE_FROM_CART:
      return
    default:
      return state
  }
}
