import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {auth} from '../store'
import {withStyles} from '@material-ui/core/styles'

import Footer from './Footer'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  wrapper: {
    width: '40em'
  },
  inputWrapper: {
    width: '50%',
    marginTop: '5em'
  },
  inputField: {
    backgroundColor: theme.palette.common.colorThree
  },
  button: {
    fontFamily: 'Lato',
    fontWeight: 300
  }
})

class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      method: 'signup'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeHander = this.changeHander.bind(this)
  }

  changeHander(event) {
    this.setState({[event.currentTarget.name]: event.target.value})
    console.log('@@@@@@@@@@', this.state.email)
  }

  async handleSubmit(evt) {
    try {
      evt.preventDefault()
      const formName = this.state.method
      const email = this.state.email
      const password = this.state.password
      await this.props.auth(email, password, formName)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {classes, displayName, error} = this.props

    return (
      //   ------------------ entire page wrapper
      <Grid container justify="center" style={{marginTop: '10em'}}>
        <form onSubmit={this.handleSubmit} name={name}>
          <Grid
            container
            direction="column"
            className={classes.wrapper}
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h1">{displayName}</Typography>
            </Grid>
            {/* //   ------------------ text fields wrapper */}

            <Grid
              item
              container
              direction="column"
              className={classes.inputWrapper}
            >
              <TextField
                label="Email"
                name="email"
                variant="filled"
                className={classes.inputField}
                onChange={this.changeHander}
                style={{marginBottom: '2em'}}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="filled"
                onChange={this.changeHander}
                className={classes.inputField}
              />
              {error && error.response && <div> {error.response.data} </div>}
            </Grid>
            {/* ---------------------------------------buttons container */}
            <Grid item container />
            <Button
              style={{marginTop: '2em'}}
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.button}
            >
              Sign Up In
            </Button>
            <Grid item container justify="center">
              <Button
                style={{marginTop: '2em', marginRight: '1em'}}
                variant="contained"
                color="secondary"
                component="a"
                href="/auth/Google"
                className={classes.button}
              >
                Sign Up With Google
              </Button>
              {/* <Button
                style={{marginTop: '2em'}}
                variant="contained"
                color="secondary"
                component={Link}
                to="/login"
                className={classes.button}
                onClick={this.handleSubmit}
              >
                Sign In
              </Button> */}
            </Grid>
          </Grid>
        </form>
        <Footer />
      </Grid>
    )
  }
}

const mapState = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}
const mapDispatch = dispatch => {
  return {
    auth: (email, password, method) => dispatch(auth(email, password, method))
  }
}

export default compose(
  connect(mapState, mapDispatch),
  withStyles(styles, {withTheme: true})
)(Signup)
