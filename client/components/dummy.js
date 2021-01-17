import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../redux/user";
import OAuthForm from "./OAuthForm";
import Avatar from "avataaars";
class Login extends Component {
   constructor() {
      super();
      this.state = {
         email: “”,
         password: “”,
         //is this safe?
         method: "log-in",
         errorMessage: "",
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.changeHandler = this.changeHandler.bind(this);
   }
   changeHandler(e) {
      this.setState({ [e.target.name]: e.target.value });
   }
   async handleSubmit(e) {
      e.preventDefault();
      const email = this.state.email;
      const password = this.state.password;
      const method = this.state.method;
      try {
         await this.props.auth(email, password, method);
      } catch (error) {
         console.log(error);
      }
   }
   render() {
      const error = this.props.error;
      const avatar = {
         width: “200px”,
         height: “200px”,
         alignSelf: “center”
      };
      return (
         <div className="main">
            <div className="login-container">
               <Avatar
                  style={avatar}
                  avatarStyle="Circle"
                  topType="LongHairCurly"
                  accessoriesType="Blank"
                  hairColor="PastelPink"
                  facialHairType="Blank"
                  clotheType="ShirtCrewNeck"
                  clotheColor="Gray01"
                  eyeType="Wink"
                  eyebrowType="Default"
                  mouthType="Smile"
                  skinColor="Light"
               />
               <form>
                  <label htmlFor="email"></label>
                  <input
                     type="text"
                     placeholder="Enter Email"
                     name="email"
                     required
                     onChange={this.changeHandler}
                  ></input>
                  <label htmlFor="password"></label>
                  <input
                     type="password"
                     placeholder="Enter Password"
                     name="password"
                     required
                     onChange={this.changeHandler}
                  ></input>
                  <button
                     className="form-button"
                     type="submit"
                     onClick={this.handleSubmit}
                  >
                     Log In
                  </button>
                  <div> {this.state.errorMessage} </div>
               </form>
               <OAuthForm authMethod="Log In" />
               <div className="login-footer">
                  <Link to="/sign-up">Create an Account</Link>
               </div>
            </div>
         </div>
      );
   }
}
const mapDispatch = (dispatch) => {
   return {
      auth: (email, password, method) => dispatch(auth(email, password, method)),
   };
};
export default connect(null, mapDispatch)(Login);





// import React from 'react'
// import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {compose} from 'redux'
// import PropTypes from 'prop-types'
// import {auth} from '../store'
// import {withStyles} from '@material-ui/core/styles'

// import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
// import TextField from '@material-ui/core/TextField'

// const styles = (theme) => ({
//   toolbar: {
//     paddingTop: '1em',
//     paddingBottom: '1em',
//   },
//   toolbarMargin: {
//     ...theme.mixins.toolbar,
//     marginBottom: '2em',
//   },
//   navbar: {
//     backgroundColor: theme.palette.common.colorWhite,
//   },
//   tabsCont: {
//     marginLeft: '9em',
//   },
//   tab: {
//     ...theme.typography.tab,
//   },
//   tabs2: {
//     ...theme.typography.tab,
//     marginLeft: '66em',
//     [theme.breakpoints.down('md')]: {
//       marginLeft: '20em',
//       color: 'fff',
//     },
//   },
//   cartButtonImg: {
//     width: '4em',
//   },
// })

// const AuthForm = (props) => {
//   const {name, displayName, handleSubmit, error} = props
//   const classes = this.props

//   return (
//     //   ------------------ entire page wrapper
//     <Grid container direction="column">
//       <Grid item>
//         <Typography variant="h1">Sign In</Typography>
//       </Grid>
//       {/* //   ------------------ text fields wrapper */}
//       <Grid item container direction='column'>
//           <TextField
//             label="Email"
//             id="name"
//             value={name}
//             fullWidth
//             onChange={(event) => setName(event.target.value)}
//           ></TextField>
//       </Grid>
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
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(auth(email, password, formName))
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
