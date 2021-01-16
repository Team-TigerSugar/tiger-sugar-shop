import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import {compose} from 'redux'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
  //   root: {
  //     minWidth: 275,
  //     backgroundColor: theme.palette.common.colorThree,
  //   },
  //   pos: {
  //     marginBottom: 12,
  //   },
})

class LoginSignup extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Grid container direction="row">
        {/* <Card className={classes.root}>
          <CardContent>
            <Typography variant="h1" gutterBottom>
              Returning Customer
            </Typography>
            <Typography variant="body1">Sign into your account here</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card> */}
        <Typography variant="h1">Sign Up</Typography>
        <Typography variant="h1">Guest Checkout</Typography>
      </Grid>
    )
  }
}

export default withStyles(styles, {withTheme: true})(LoginSignup)
