import React from 'react'
import {withStyles} from '@material-ui/core/styles'

import Footer from './Footer'

import heroImg from '../../public/images/heroFlower.jpg'
import featureSection from '../../public/images/featureSection.png'
import potion1 from '../../public/images/potion1.png'
import potion2 from '../../public/images/potion2.png'
import potion3 from '../../public/images/potion3.png'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  heroImg: {
    width: '20em',
    height: '47em'
  }
})

class Landing extends React.Component {
  render() {
    const {classes} = this.props

    return (
      <Grid container direction="column">
        {/* ------------------------------------------------------------ hero section */}
        <Grid item container direction="row">
          <Grid item lg={3}>
            <img
              src={heroImg}
              alt="flower"
              className={classes.heroImg}
              style={{width: '20em'}}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            style={{marginTop: '20em', marginLeft: '15em', width: '31em'}}
            lg={3}
          >
            <Typography variant="body1">WELCOME TO</Typography>
            <Typography
              variant="h1"
              style={{marginTop: '1em', marginBottom: '1em'}}
            >
              Tiger Sugar Balm
            </Typography>
            <Typography variant="body2" paragraph>
              An apothecary full of potions that make your wildest dreams come
              true
            </Typography>
          </Grid>
        </Grid>
        {/* ------------------------------------------------------------ featured section */}
        <Grid container>
          <Grid
            item
            container
            style={{
              backgroundImage: `url(${featureSection})`,
              height: '60em',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-reapeat'
            }}
          >
            <Grid
              item
              container
              justify="center"
              alignContent="center"
              style={{marginBottom: '10em'}}
            >
              <img
                src={potion1}
                alt="tag with potion bottle"
                style={{width: '25em', height: '25em'}}
              />
              <img
                src={potion2}
                alt="tag with potion bottle"
                style={{
                  width: '40em',
                  height: '40em',
                  marginTop: '-10em',
                  marginLeft: '5em'
                }}
              />
              <img
                src={potion3}
                alt="tag with potion bottle"
                style={{width: '28em', height: '28em'}}
              />
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    )
  }
}

export default withStyles({styles, withTheme: true})(Landing)
