import axios from 'axios'

//Action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const REMOVE_PRODUCT = ' REMOVE_PRODUCT'
const ADD_PRODUCT = ' ADD_PRODUCT'
//Action creator
export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})
export const updateProduct = editedProd => ({
  type: UPDATE_PRODUCT,
  editedProd
})
export const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
})
export const addProduct = newProd => ({
  type: ADD_PRODUCT,
  newProd
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

export const updateProductThunk = (productId, editedProd) => async dispatch => {
  try {
    console.log('productId', productId)
    console.log('newProd', editedProd)
    const {data} = await axios.put(`/api/products/${productId}`, editedProd)
    console.log('@@@@@', data)
    dispatch(updateProduct(data))
  } catch (err) {
    console.log(err)
  }
}
// export const updateSingleProjectThunk = (
//   projectId,
//   updateSingleProjectState
// ) => {
//   return async (dispatch) => {
//     try {
//       const {data} = await axios.put(
//         `/api/projects/${projectId}`,
//         updateSingleProjectState
//       )
//       dispatch(updateSingleProject(data))
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
export const removeProductThunk = productId => async dispatch => {
  try {
    await axios.delete(`/api/products/${productId}`)
    dispatch(removeProduct(productId))
  } catch (err) {
    console.log(err)
  }
}

export const addProductThunk = newProd => async dispatch => {
  try {
    const newProdData = await axios.post(`/api/products/`, newProd)
    dispatch(addProduct(newProdData.data))
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
      return [...state, action.editedProd]
    case REMOVE_PRODUCT:
      return state.products.filter(product => product.id !== action.productId)
    case ADD_PRODUCT:
      return [...state.products]
    default:
      return state
  }
}
export default productsReducer
