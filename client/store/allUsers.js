import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADMIN_GET_USERS = 'ADMIN_GET_USERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const adminGetUsers = users => ({type: ADMIN_GET_USERS, users})

/**
 * THUNK CREATORS
 */
export const adminFetchUsersThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/admin/${userId}`)
    dispatch(adminGetUsers(data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * SUB REDUCER
 */
const adminUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return action.users
    default:
      return state
  }
}
export default adminUsersReducer
