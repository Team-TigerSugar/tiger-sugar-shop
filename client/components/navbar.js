import React from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, me} from '../store'
import {compose} from 'redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {useTheme, makeStyles} from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import cartButton from '../../public/icons/cartButton.png'

const styles = (theme) => ({
  toolbar: {
    paddingTop: '1em',
    paddingBottom: '1em',
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '2em',
  },
  navbar: {
    backgroundColor: theme.palette.common.colorWhite,
  },
  tabsCont: {
    marginLeft: '9em',
  },
  tab: {
    ...theme.typography.tab,
  },
  tabs2: {
    ...theme.typography.tab,
    marginLeft: '66em',
    [theme.breakpoints.down('md')]: {
      marginLeft: '20em',
      color: 'fff',
    },
  },
  cartButtonImg: {
    width: '4em',
  },
})

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event, value) => {
    this.setState({
      value: value,
    })
  }

  async componentDidMount() {
    try {
      await this.props.me()
    } catch (error) {
      console.log(error)
    }
    if (window.location.pathname === '/' && this.state.value !== 0) {
      this.setState({value: 0})
    } else if (
      window.location.pathname === '/about' &&
      this.state.value !== 1
    ) {
      this.setState({value: 1})
    } else if (window.location.pathname === '/shop' && this.state.value !== 2) {
      this.setState({value: 2})
    }
  }

  //   async componentDidMount() {
  //     try {
  //       await this.props.me()
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  render() {
    const isLoggedIn = this.props.user
    const {classes} = this.props

    const value = this.state.value
    return (
      <React.Fragment>
        <AppBar
          position="fixed"
          style={{boxShadow: 'none'}}
          className={classes.navbar}
        >
          {isLoggedIn && Object.keys(isLoggedIn).length ? (
            <Toolbar className={classes.toolbar}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                className={classes.tabsCont}
                indicatorColor="primary"
              >
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/"
                  label="HOME"
                />
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/about"
                  label="ABOUT US"
                />
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/products"
                  label="SHOP"
                />

                <Button component="a" to="/" onClick={this.props.logout}>
                  SIGN OUT
                </Button>
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/home"
                  label="ACCOUNT"
                  style={{marginLeft: '66em'}}
                />
              </Tabs>
              <Button component={Link} to="/cart">
                <img
                  src={cartButton}
                  alt="circle with cart"
                  className={classes.cartButtonImg}
                />
              </Button>
            </Toolbar>
          ) : (
            <Toolbar className={classes.toolbar}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                className={classes.tabsCont}
                indicatorColor="primary"
              >
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/"
                  label="HOME"
                />
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/about"
                  label="ABOUT US"
                />
                <Tab
                  className={classes.tab}
                  component={Link}
                  to="/products"
                  label="SHOP"
                />
                <Tab
                  component={Link}
                  to="/login"
                  label="SIGN IN"
                  className={classes.tabs2}
                />

                <Button component={Link} to="/cart">
                  <img
                    src={cartButton}
                    alt="circle with cart"
                    className={classes.cartButtonImg}
                    style={{marginRight: '2em'}}
                  />
                </Button>
              </Tabs>
            </Toolbar>
          )}
        </AppBar>
        <div className={classes.toolbarMargin} />
      </React.Fragment>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    me: () => dispatch(me()),
    logout: () => dispatch(logout()),
  }
}

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(Navbar)

// export default withStyles(styles, {withTheme: true})(Navbar)
// export default connect(mapState, mapDispatch)(Navbar)

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     <h1>BOILERMAKER</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
