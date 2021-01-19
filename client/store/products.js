import axios from 'axios'

//Action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = ' REMOVE_PRODUCT'
//Action creator
export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})
export const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
})
export const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
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

export const updateProductThunk = productId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${productId}`)
    dispatch(updateProduct(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeProductThunk = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(removeProduct(productId))
  } catch (err) {
    console.log(err)
  }
}

const intialState = []

//Sub-reducer
const productsReducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case UPDATE_PRODUCT:
      return [...state, action.product]
    case REMOVE_PRODUCT:
      return state.products.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
export default productsReducer
