import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    margin: 50
  }
})

export const ConfirmOrder = props => {
  const {firstName, shippingInfo, classes} = props

  return (
    <React.Fragment>
      <Grid container direction="column" className={classes.root}>
        <Typography variant="h1" gutterBottom>
          Thank you, {firstName}!
        </Typography>
        <Typography variant="body1">
          Your order was placed successfully. You will be receiving your potions
          at {shippingInfo} soon.
        </Typography>
        <Link to="/">
          <Button>back to Tiger Sugar Balm</Button>
        </Link>
      </Grid>
    </React.Fragment>
  )
}

const mapState = state => {
  return {
    firstName: state.user.firstName,
    shippingInfo: state.user.shippingInfo
  }
}

export default compose(
  connect(mapState),
  withStyles(styles, {withTheme: true})
)(ConfirmOrder)
