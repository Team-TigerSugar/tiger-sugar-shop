import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
  root: {
    maxWidth: 400,
    backgroundColor: theme.palette.common.colorThree,
    margin: 70
  },
  pos: {
    justifyContent: 'center',
    marginBottom: 12
  }
})

class CheckoutMethods extends Component {
  constructor() {
    super()
  }

  render() {
    const {classes} = this.props
    return (
      <Grid container direction="row" justify="center" align="center">
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h1" gutterBottom>
              Already Have an Account?
            </Typography>
            <Typography variant="body1">You can sign in here.</Typography>
          </CardContent>
          <CardActions className={classes.pos}>
            <Link to="/Login">
              <Button>sign in</Button>
            </Link>
          </CardActions>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h1" gutterBottom>
              Become a Member
            </Typography>
            <Typography variant="body1">
              Create an account for faster checkout on future orders.
            </Typography>
          </CardContent>
          <CardActions className={classes.pos}>
            <Link to="/Login">
              <Button>sign up</Button>
            </Link>
          </CardActions>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h1" gutterBottom>
              Checkout as a Guest
            </Typography>
            <Typography variant="body1">
              No need to make an account, but your information won't be saved
              for next time.
            </Typography>
          </CardContent>
          <CardActions className={classes.pos}>
            <Link to="/Login">
              <Button>continue as guest</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

export default withStyles(styles, {withTheme: true})(CheckoutMethods)
