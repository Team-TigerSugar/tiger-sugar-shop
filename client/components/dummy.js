// import React from 'react'
// import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {compose} from 'redux'
// import {auth} from '../store'
// import {withStyles} from '@material-ui/core/styles'
// import PropTypes from 'prop-types'

// import Footer from './Footer'

// import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
// import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'

// const styles = (theme) => ({
//   wrapper: {
//     width: '40em',
//   },
//   inputWrapper: {
//     width: '50%',
//     marginTop: '5em',
//   },
//   inputField: {
//     backgroundColor: theme.palette.common.colorThree,
//   },
//   button: {
//     fontFamily: 'Lato',
//     fontWeight: 300,
//   },
// })

// export const UserHome = (props) => {
//   const {firstName, lastName, email, shippingInfo, billingInfo} = props

//   return (
//     <Grid container direction="column">
//       <Grid container>
//         <Typography variant="h1">Welcome, {firstName}</Typography>
//       </Grid>
//       <Grid item container></Grid>
//     </Grid>
//   )
// }

// const mapState = (state) => {
//   return {
//     firstName: state.user.firstName,
//     lastName: state.user.lastName,
//     email: state.user.email,
//     shippingInfo: state.user.shippingInfo,
//     billingInfo: state.user.billingInfo,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     auth: (email, password, method) => dispatch(auth(email, password, method)),
//   }
// }

// export default compose(
//   connect(mapState),
//   withStyles(styles, {withTheme: true})
// )(UserHome)

// UserHome.propTypes = {
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   email: PropTypes.string,
//   shippingInfo: PropTypes.string,
//   billingInfo: PropTypes.string,
// }
