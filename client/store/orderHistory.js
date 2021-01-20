import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADMIN_GET_ORDERS = 'ADMIN_GET_ORDERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const adminGetOrders = orders => ({type: ADMIN_GET_ORDERS, orders})

/**
 * THUNK CREATORS
 */
export const adminFetchOrdersThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/admin/${userId}`)
    dispatch(adminGetOrders(data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * SUB REDUCER
 */
const orderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
export default orderHistoryReducer
