// import React from 'react'
// import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import {logout, me} from '../store'
// import {compose} from 'redux'

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

// class Navbar extends React.Component {
//  const {name, displayName, handleSubmit, error} = props

//   render() {
//     const isLoggedIn = this.props.user
//     console.log('isLoggedIn', isLoggedIn)
//     const {classes} = this.props

//     const value = this.state.value
//     return (
//       <React.Fragment>
//         <AppBar
//           position="fixed"
//           style={{boxShadow: 'none'}}
//           className={classes.navbar}
//         >
//           {isLoggedIn && Object.keys(isLoggedIn).length ? (
//             <Toolbar className={classes.toolbar}>
//               <Tabs
//                 value={value}
//                 onChange={this.handleChange}
//                 className={classes.tabsCont}
//                 indicatorColor="primary"
//               >
//                 <Tab
//                   className={classes.tab}
//                   component={Link}
//                   to="/"
//                   label="HOME"
//                 />
//                 <Tab
//                   className={classes.tab}
//                   component={Link}
//                   to="/about"
//                   label="ABOUT US"
//                 />
//                 <Tab
//                   className={classes.tab}
//                   component={Link}
//                   to="/products"
//                   label="SHOP"
//                 />

//                 <Button component="a" to="/" onClick={this.props.logout}>
//                   SIGN OUT
//                 </Button>
//                 <Tab
//                   className={classes.tab}
//                   component={Link}
//                   to="/home"
//                   label="ACCOUNT"
//                   style={{marginLeft: '66em'}}
//                 />
//               </Tabs>
//               <Button component={Link} to="/cart">
//                 <img
//                   src={cartButton}
//                   alt="circle with cart"
//                   className={classes.cartButtonImg}
//                 />
//               </Button>
//             </Toolbar>
//           ) : (
//             <Toolbar className={classes.toolbar}>
//               <Tabs
//                 value={value}
//                 onChange={this.handleChange}
//                 className={classes.tabsCont}
//                 indicatorColor="primary"
//               >
//                 <Tab
//                   className={classes.tab}
//                   component={Link}
//                   to="/"
//                   label="HOME"
//                 />
//                 <Tab
//                   className={classes.tab}
//                   component={Link}
//                   to="/about"
//                   label="ABOUT US"
//                 />
//                 <Tab
//                   className={classes.tab}
//                   component={Link}
//                   to="/products"
//                   label="SHOP"
//                 />
//                 <Tab
//                   component={Link}
//                   to="/login"
//                   label="SIGN IN"
//                   className={classes.tabs2}
//                 />

//                 <Button component={Link} to="/cart">
//                   <img
//                     src={cartButton}
//                     alt="circle with cart"
//                     className={classes.cartButtonImg}
//                     style={{marginRight: '2em'}}
//                   />
//                 </Button>
//               </Tabs>
//             </Toolbar>
//           )}
//         </AppBar>
//         <div className={classes.toolbarMargin} />
//       </React.Fragment>
//     )
//   }
// }

// const mapState = (state) => {
//   return {
//     user: state.user,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     },
//     me: () => dispatch(me()),
//     logout: () => dispatch(logout()),
//   }
// }

// export default compose(
//   connect(mapState, mapDispatch),
//   withStyles(styles, {withTheme: true})
// )(Navbar)
