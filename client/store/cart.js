import axios from 'axios'

//ACTION TYPES
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'

//INITAIL STATE
const defaultState = {items: {}}
//maybe items should be an array?

//ACTION CREATORS
const addToCart = item => ({
  type: ADD_TO_CART,
  item
})

const deleteFromCart = () => ({
  type: DELETE_FROM_CART
})

//THUNK CREATORS

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
