import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Footer from './Footer'

import aboutUs from '../../public/images/aboutUs.png'
import kay from '../../public/images/kay.png'
import jackie from '../../public/images/jackie.png'
import julia from '../../public/images/julia.png'
import lindsey from '../../public/images/lindsey.png'
import sam from '../../public/images/sam.png'
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
          <Grid>
            <img src={aboutUs} alt="wall of bottles" style={{width: '40em'}} />
          </Grid>
          <Grid item style={{width: '30em', marginLeft: '10em'}}>
            <Typography variant="body2" paragraph>
              We’re Tiger Sugar Balm, An apothecary founded by four ladies with
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
          <Grid item container justify="center" style={{marginTop: '5em'}}>
            <Grid
              itemitem
              component="a"
              href="https://www.linkedin.com/in/kay-hardeman/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={kay}
                alt="girl"
                style={{
                  width: '10em',
                  height: '10em',
                  marginLeft: '5em',
                  marginRight: '5em'
                }}
              />
              <Typography align="center" variant="body1">
                Kay Hardeman
              </Typography>
              <Typography align="center" variant="body2">
                Project Manager
              </Typography>
            </Grid>
            <Grid
              itemitemitem
              component="a"
              href="https://www.linkedin.com/in/jackie-levine-feit/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={jackie}
                alt="girl"
                style={{
                  width: '10em',
                  height: '10em',
                  marginLeft: '5em',
                  marginRight: '5em'
                }}
              />
              <Typography align="center" variant="body1">
                Jackie Levine
              </Typography>
              <Typography align="center" variant="body2">
                Product Manager
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justify="center" style={{marginTop: '5em'}}>
            <Grid
              item
              itemitemitem
              component="a"
              href="https://www.linkedin.com/in/julia-kravets/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={julia}
                alt="girl"
                style={{
                  width: '10em',
                  height: '10em',
                  marginLeft: '5em',
                  marginRight: '5em'
                }}
              />
              <Typography align="center" variant="body1">
                Julia Kravets
              </Typography>
              <Typography align="center" variant="body2">
                Fullstack SWE
              </Typography>
            </Grid>
            <Grid
              item
              itemitemitem
              component="a"
              href="https://www.linkedin.com/in/lindsey-pak-babaaa12b/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={lindsey}
                alt="girl"
                style={{
                  width: '10em',
                  height: '10em',
                  marginLeft: '5em',
                  marginRight: '5em'
                }}
              />
              <Typography align="center" variant="body1">
                Lindsey Pak
              </Typography>
              <Typography align="center" variant="body2">
                Creative Developer
              </Typography>
            </Grid>
            <Grid
              item
              itemitemitem
              component="a"
              href="https://www.linkedin.com/in/samantha-shapland-7a94891b6/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={sam}
                alt="girl"
                style={{
                  width: '10em',
                  height: '10em',
                  marginLeft: '5em',
                  marginRight: '5em'
                }}
              />
              <Typography align="center" variant="body1">
                Samantha Shapland
              </Typography>
              <Typography align="center" variant="body2">
                Fullstack SWE
              </Typography>
            </Grid>
            <Grid
              item
              itemitemitem
              component="a"
              href="https://www.linkedin.com/in/priscila-pintado-112416142"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={pris}
                alt="girl"
                style={{
                  width: '10em',
                  height: '10em',
                  marginLeft: '5em',
                  marginRight: '5em'
                }}
              />
              <Typography align="center" variant="body1">
                Priscila Pintado
              </Typography>
              <Typography align="center" variant="body2">
                Fullstack SWE
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    )
  }
}
