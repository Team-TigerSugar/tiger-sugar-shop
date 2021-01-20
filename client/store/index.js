import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allUsers from './allUsers'
import productsReducer from './products'
import singleProductReducer from './singleProduct'
import cart from './cart'
import cartItem from './cartItem'
import allCartItems from './allCartItems'
import orderHistory from './orderHistory'

const reducer = combineReducers({
  user,
  allUsers,
  products: productsReducer,
  singleProduct: singleProductReducer,
  cart,
  cartItem,
  allCartItems,
  orderHistory
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allUsers'
export * from './products'
export * from './singleProduct'
export * from './allCartItems'
