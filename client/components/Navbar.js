import React from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout, me} from '../store'
import {compose} from 'redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import cartButton from '../../public/icons/cartButton.png'

const styles = theme => ({
  toolbar: {
    paddingTop: '1em',
    paddingBottom: '1em'
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '2em'
  },
  navbar: {
    backgroundColor: theme.palette.common.colorWhite,
    maxWidth: '100%',
    minWidth: 1450,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  tabsCont: {
    marginLeft: '9em'
  },
  tab: {
    ...theme.typography.tab
  },
  tabs2: {
    ...theme.typography.tab
    //     marginLeft: 'auto',
    //     [theme.breakpoints.down('md')]: {
    //       marginLeft: '20em',
    //       color: 'fff',
    //     },
  },
  cartButtonImg: {
    width: '4em'
  },
  menu: {
    ...theme.typography.tab,
    backgroundColor: theme.palette.common.colorThree
  },

  menuItem: {
    fontSize: '0.7em'
  }
})

class Navbar extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      anchorEl: null,
      menuOpen: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleChange = (event, value) => {
    this.setState({
      value: value
    })
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      menuOpen: true
    })
  }

  handleClose = event => {
    this.setState({
      anchorEl: event.currentTarget,
      menuOpen: false
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
        <AppBar style={{boxShadow: 'none'}} className={classes.navbar}>
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
                <Button
                  component="a"
                  to="/"
                  onClick={this.props.logout}
                  style={{marginLeft: '55em'}}
                >
                  SIGN OUT
                </Button>
                <Tab
                  aria-controls={
                    this.state.anchorEl ? 'simple-menu' : undefined
                  }
                  aria-haspopup={this.state.anchorEl ? 'true' : undefined}
                  onMouseOver={this.handleClick}
                  className={classes.tab}
                  component={Link}
                  to="/home"
                  label="ACCOUNT"
                />
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={this.state.menuOpen}
                  onClose={this.handleClose}
                  classes={{paper: classes.menu}}
                  elevation={0}
                  MenuListProps={{onMouseLeave: this.handleClose}}
                >
                  <MenuItem
                    component={Link}
                    to="/home"
                    onClick={this.handleClose}
                    classes={{root: classes.menuItem}}
                  >
                    ACCOUNT
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/admininventory"
                    onClick={this.handleClose}
                    classes={{root: classes.menuItem}}
                  >
                    INVENTORY
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/admincustomers"
                    onClick={this.handleClose}
                    classes={{root: classes.menuItem}}
                  >
                    CUSTOMERS
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/adminorders"
                    onClick={this.handleClose}
                    classes={{root: classes.menuItem}}
                  >
                    ORDERS
                  </MenuItem>
                </Menu>
                <Button component={Link} to="/cart">
                  <img
                    src={cartButton}
                    alt="circle with cart"
                    className={classes.cartButtonImg}
                  />
                </Button>
              </Tabs>
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
                  style={{marginLeft: '55em'}}
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

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    me: () => dispatch(me()),
    logout: () => dispatch(logout())
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
