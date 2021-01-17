// import React from 'react'
// import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {compose} from 'redux'
// import PropTypes from 'prop-types'
// import {auth} from '../store'
// import {withStyles} from '@material-ui/core/styles'

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

// // class AuthForm extends React.Component {
// const AuthForm = (props) => {
//   //   handleSubmit() {}

//   //   render() {
//   const {name, classes, displayName, handleSubmit, error} = props

//   return (
//     //   ------------------ entire page wrapper
//     <Grid container justify="center" style={{marginTop: '10em'}}>
//       <form onSubmit={handleSubmit} name={name}>
//         <Grid
//           container
//           direction="column"
//           className={classes.wrapper}
//           alignItems="center"
//         >
//           <Grid item>
//             <Typography variant="h1">{displayName}</Typography>
//           </Grid>
//           {/* //   ------------------ text fields wrapper */}

//           <Grid
//             item
//             container
//             direction="column"
//             className={classes.inputWrapper}
//           >
//             {/* {displayName === 'Sign Up' ? (
//               <div>
//                 <TextField
//                   label="First Name"
//                   id="firstName"
//                   variant="filled"
//                   className={classes.inputField}
//                 ></TextField>
//                 <TextField
//                   label="Last Name"
//                   id="lastName"
//                   variant="filled"
//                   className={classes.inputField}
//                 ></TextField>
//               </div>
//             ) : (
//               <div></div>
//             )} */}
//             <TextField
//               label="Email"
//               id="email"
//               variant="filled"
//               className={classes.inputField}
//               style={{marginBottom: '2em'}}
//             ></TextField>
//             <TextField
//               label="Password"
//               id="password"
//               variant="filled"
//               className={classes.inputField}
//             ></TextField>
//             {error && error.response && <div> {error.response.data} </div>}
//           </Grid>
//           {/* ---------------------------------------buttons container */}
//           <Grid item container></Grid>
//           <Button
//             style={{marginTop: '2em'}}
//             variant="contained"
//             color="secondary"
//             type="submit"
//             className={classes.button}
//           >
//             {displayName}
//           </Button>
//           <Grid item container justify="center">
//             <Button
//               style={{marginTop: '2em', marginRight: '1em'}}
//               variant="contained"
//               color="secondary"
//               component="a"
//               href="/auth/Google"
//               className={classes.button}
//             >
//               {displayName} With Google
//             </Button>
//             {displayName === 'Sign Up' ? (
//               <Button
//                 style={{marginTop: '2em'}}
//                 value={displayName}
//                 variant="contained"
//                 color="secondary"
//                 component={Link}
//                 to="/login"
//                 className={classes.button}
//               >
//                 Sign In
//               </Button>
//             ) : (
//               <Button
//                 style={{marginTop: '2em'}}
//                 variant="contained"
//                 color="secondary"
//                 component={Link}
//                 to="/signup"
//                 className={classes.button}
//               >
//                 Sign Up
//               </Button>
//             )}
//           </Grid>
//         </Grid>
//       </form>
//       <Footer />
//     </Grid>
//   )
// }

// const mapLogin = (state) => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error,
//   }
// }
// const mapSignup = (state) => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.currentTarget.displayName
//       const firstName = evt.currentTarget.value
//       const lastName = evt.currentTarget.value
//       const email = evt.currentTarget.email.value
//       const password = evt.currentTarget.password.value
//       dispatch(auth(email, password, firstName, lastName, formName))
//     },
//   }
// }

// export const Login = compose(
//   connect(mapLogin, mapDispatch),
//   withStyles(styles, {withTheme: true})
// )(AuthForm)

// export const Signup = compose(
//   connect(mapSignup, mapDispatch),
//   withStyles(styles, {withTheme: true})
// )(AuthForm)

// ORIGINAL CODE ============================================================
// import React from 'react'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {auth} from '../store'

// /**
//  * COMPONENT
//  */
// const AuthForm = (props) => {
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name}>
//         <div>
//           <label htmlFor="email">
//             <small>Email</small>
//           </label>
//           <input name="email" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//       <a href="/auth/google">{displayName} with Google</a>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = (state) => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.user.error,
//   }
// }

// const mapSignup = (state) => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(auth(email, password, formName))
//     },
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

// /**
//  * PROP TYPES
//  */
// AuthForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object,
// }
