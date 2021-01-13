import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(setSingleProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = {}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
