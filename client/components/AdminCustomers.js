import React from 'react'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  test: {
    color: theme.palette.common.colorOne
  }
})

class AdminCustomers extends React.Component {
  render() {
    const {classes} = this.props

    return (
      <Grid container>
        <Typography className={classes.test}>
          {' '}
          Hello this is CUSTOMERS
        </Typography>
      </Grid>
    )
  }
}
export default withStyles(styles, {withTheme: true})(AdminCustomers)
