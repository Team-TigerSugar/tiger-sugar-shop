import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {logout} from '../store'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {useTheme, makeStyles} from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'

// import cartButton from '../../public/icons/cart.svg'

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar
  },
  navbar: {
    backgroundColor: theme.palette.common.colorWhite
  },
  tabsCont: {
    marginLeft: '9em'
  },
  tab: {
    ...theme.typography.tab
  },
  tabs2: {
    marginLeft: '66em'
  }
}))

export default function Navbar() {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const handleChange = (event, value) => {
    setValue(value)
  }
  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0)
    } else if (window.location.pathname === '/about' && value !== 1) {
      setValue(1)
    } else if (window.location.pathname === '/shop' && value !== 2) {
      setValue(2)
    }
  })
  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        style={{boxShadow: 'none'}}
        className={classes.navbar}
      >
        <Toolbar>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabsCont}
            indicatorColor={theme.palette.common.colorWhite}
          >
            <div>
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
                to="/shop"
                label="SHOP"
              />
              {/* </div>
            <div className={classes.tabs2}> */}
              <Tab
                className={classes.tab}
                component={Link}
                to="/login"
                label="SIGN IN"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/cart"
                label="CART"
              />
            </div>
          </Tabs>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  )
}

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
