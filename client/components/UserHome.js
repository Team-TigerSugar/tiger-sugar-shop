import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {auth} from '../store'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import Footer from './Footer'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import info from '../../public/images/info.png'

const styles = theme => ({
  headerText: {
    marginTop: '2em',
    width: '10em'
  },
  image: {
    width: '28em'
  },
  button: {
    backgroundColor: theme.palette.common.colorTwo,
    marginTop: '4em'
  }
})

export const UserHome = props => {
  const {firstName, classes, lastName, email, shippingInfo, billingInfo} = props

  return (
    <Grid container direction="column">
      <Grid container direction="row" justify="center">
        <Typography
          variant="h1"
          justify="center"
          className={classes.headerText}
        >
          Welcome, {firstName}
        </Typography>
      </Grid>
      <Grid container direction="row" style={{marginTop: '5em'}}>
        <Grid item container lg style={{width: '50%'}} justify="flex-end">
          <img src={info} alt="flower by window" className={classes.image} />
        </Grid>
        <Grid
          item
          container
          lg
          style={{width: '50%', marginTop: '5em', paddingLeft: '7em'}}
        >
          <Grid item>
            <Typography variant="body1" style={{marginBottom: '0.7em'}}>
              NAME:
            </Typography>
            <Typography variant="body2" style={{marginBottom: '2em'}}>
              {firstName} {lastName}
            </Typography>
            <Typography variant="body1" style={{marginBottom: '0.7em'}}>
              EMAIL:
            </Typography>
            <Typography variant="body2" style={{marginBottom: '2em'}}>
              {email}
            </Typography>
            <Typography variant="body1" style={{marginBottom: '0.7em'}}>
              ADDRESSES:
            </Typography>
            <Typography variant="body2">{shippingInfo}</Typography>
            <Button variant="filled" className={classes.button}>
              Edit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  )
}

const mapState = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    shippingInfo: state.user.shippingInfo,
    billingInfo: state.user.billingInfo
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (email, password, method) => dispatch(auth(email, password, method))
  }
}

export default compose(
  connect(mapState),
  withStyles(styles, {withTheme: true})
)(UserHome)

UserHome.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  shippingInfo: PropTypes.string,
  billingInfo: PropTypes.string
}

// ============================================================
// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'

// /**
//  * COMPONENT
//  */
// export const UserHome = props => {
//   const {firstName, lastName, email, shippingInfo, billingInfo} = props

//   return (
//     <div>
//       <h2>Welcome, {firstName}</h2>
//       <h3>Account Information:</h3>
//       <h4>
//         name: {firstName} {lastName}
//       </h4>
//       <h4>email: {email}</h4>
//       <h3>Address Book</h3>
//       <h4>shipping address: {shippingInfo}</h4>
//       <h4>billing address: {billingInfo}</h4>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     firstName: state.user.firstName,
//     lastName: state.user.lastName,
//     email: state.user.email,
//     shippingInfo: state.user.shippingInfo,
//     billingInfo: state.user.billingInfo
//   }
// }

// export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   email: PropTypes.string,
//   shippingInfo: PropTypes.string,
//   billingInfo: PropTypes.string
// }
