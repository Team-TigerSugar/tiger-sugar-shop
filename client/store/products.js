import axios from 'axios'

//Action types
const GET_PRODUCTS = 'GET_PRODUCTS'

//Action creator
export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})
//Thunk creator
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.log(err)
  }
}

// const intialState = {
//   loadedProducts: []
// }
const intialState = []

//Sub-reducer
const productsReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      // return {...state, loadedProducts: action.products}
      return action.products
    default:
      return state
  }
}
export default productsReducer
