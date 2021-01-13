import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, lastName, email, shippingInfo, billingInfo} = props

  return (
    <div>
      <h2>Welcome, {firstName}</h2>
      <h3>Account Information:</h3>
      <h4>
        name: {firstName} {lastName}
      </h4>
      <h4>email: {email}</h4>
      <h3>Address Book</h3>
      <h4>shipping address: {shippingInfo}</h4>
      <h4>billing address: {billingInfo}</h4>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    shippingInfo: state.user.shippingInfo,
    billingInfo: state.user.billingInfo
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  shippingInfo: PropTypes.string,
  billingInfo: PropTypes.string
}
