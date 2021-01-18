import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Cart} from './components'
import {me} from './store'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'

import Landing from './components/Landing'
import CheckoutMethods from './components/CheckoutMethods'
import Checkout from './components/Checkout'
import ConfirmOrder from './components/ConfirmOrder'
import AdminOrders from './components/AdminOrders'
import AdminCustomers from './components/AdminCustomers'
import AdminInventory from './components/AdminInventory'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* the Login and Signup components are both connected to the AuthForm component */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/about" component={() => <div>About Us</div>} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkoutmethods" component={CheckoutMethods} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/confirmorder" component={ConfirmOrder} />
        <Route exact path="/adminorders" component={AdminOrders} />
        <Route exact path="/admininventory" component={AdminInventory} />
        <Route exact path="/adminCustomers" component={AdminCustomers} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
