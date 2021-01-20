import React, {Component} from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import aboutUs from '../../public/images/aboutUs.png'
import kay from '../../public/images/kay.png'
import jackie from '../../public/images/jackie.png'
import julia from '../../public/images/julia.png'
import lindsey from '../../public/images/lindsey.png'
import pris from '../../public/images/pris.png'

export default class AboutUs extends Component {
  render() {
    const cardTheme = {
      root: {
        width: '21%',
        height: '25em',
        margin: '2%',
        alignItems: 'center'
      },
      media: {
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
        width: '100px'
      }
    }

    return (
      <Grid container direction="column">
        <Grid item alignItems="center">
          <Typography align="center" variant="h1">
            About Us
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="flex-end"
          justify="center"
          style={{marginTop: '5em'}}
        >
          <Grid item>
            <img src={aboutUs} alt="wall of bottles" style={{width: '40em'}} />
          </Grid>
          <Grid item style={{width: '30em', marginLeft: '10em'}}>
            <Typography variant="body2" paragraph>
              We’re Tiger Sugar Balm, And apothecary founded by four ladies with
              a passion for making people’s lives easier ... with a twist.
            </Typography>
            <Typography variant="body2" paragraph>
              With potions for any every occasion, we’re positive you’ll find
              soemthing for you or a loved one. Take your next step into magical
              apothecary.
            </Typography>
          </Grid>
        </Grid>
        <Grid item alignItems="center" style={{marginTop: '5em'}}>
          <Typography align="center" variant="h1">
            Meet Our Team
          </Typography>
        </Grid>
        <Grid item container direction="column" alignItems="center">
          <Grid item container justify="center">
            <Grid item>
              <img
                src={kay}
                alt="girl"
                style={{
                  width: '10em',
                  height: '10em',
                  marginLeft: '1em',
                  marginRight: '1em'
                }}
              />
              <Typography align="center" variant="body1">
                Kay Hardeman
              </Typography>
              <Typography align="center" variant="body2">
                Project Manager
              </Typography>
            </Grid>
            <Grid item>
              <img
                src={jackie}
                alt="girl"
                style={{width: '10em', height: '10em'}}
              />
              <Typography align="center" variant="body1">
                Jackie Levine
              </Typography>
              <Typography align="center" variant="body2">
                Product Manager
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
