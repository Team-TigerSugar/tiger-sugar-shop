import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import heroImg from '../../public/images/heroFlower.jpg'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  heroImg: {
    width: '20em',
    height: '47em'
  }
})

class Landing extends React.Component {
  constructor() {
    super()
  }
  render() {
    const {classes} = this.props
    return (
      <Grid container direction="column">
        <Grid item container>
          <div>
            <img
              src={heroImg}
              alt="flower"
              className={classes.heroImg}
              style={{width: '20em'}}
            />
          </div>
        </Grid>
        <Grid item container>
          <Typography variant="bodyAccent">WELCOME TO</Typography>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles({styles, withTheme: true})(Landing)
