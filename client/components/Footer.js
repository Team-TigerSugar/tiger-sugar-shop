import React from 'react'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import logo from '../../public/images/logo.png'
import igIcon from '../../public/images/igIcon.png'
import fbIcon from '../../public/images/fbIcon.png'
import twitterIcon from '../../public/images/twitterIcon'

const styles = theme => ({
  footerCont: {
    backgroundColor: '#D1C9B3',
    marginTop: '20em'
  },
  footerImgCont: {
    width: '35em'
  },
  footerLogo: {
    width: '35em',
    paddingTop: '1em'
  },
  footerNavCont: {
    width: '35em',
    marginLeft: '10em',
    marginTop: '5em'
  },
  link: {
    textDecoration: 'none',
    fontFamily: 'Lato',
    fontWeight: 400,
    fontSize: '1.35em',
    color: '#fff',
    letterSpacing: 2
  },
  socialIcons: {
    width: '3em'
  },
  footerLinktCont: {
    width: '35em',
    marginTop: '5em'
  }
})

class Footer extends React.Component {
  render() {
    const {classes} = this.props

    return (
      <Grid container className={classes.footerCont}>
        <Grid item container alignItems="center">
          <Grid item container className={classes.footerImgCont} lg>
            <img src={logo} alt="company logo" className={classes.footerLogo} />
          </Grid>
          <Grid
            item
            container
            className={classes.footerNavCont}
            justify="center"
            lg
          >
            <Grid item component={Link} to="/" className={classes.link}>
              HOME
            </Grid>
            <Grid
              item
              component={Link}
              to="/"
              className={classes.link}
              style={{marginRight: '2em', marginLeft: '2em'}}
            >
              ABOUT US
            </Grid>
            <Grid item component={Link} to="/" className={classes.link}>
              FAQ
            </Grid>
          </Grid>
          <Grid
            item
            container
            className={classes.footerLinktCont}
            justify="center"
            lg
          >
            <Grid
              item
              component="a"
              href="https://www.instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={igIcon}
                alt="instagram icon"
                className={classes.socialIcons}
              />
            </Grid>
            <Grid
              item
              component="a"
              href="https://www.twitter.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={twitterIcon}
                alt="twitter icon"
                className={classes.socialIcons}
                style={{marginLeft: '2em', marginRight: '2em'}}
              />
            </Grid>
            <Grid
              item
              component="a"
              href="https://www.facebook.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img
                src={fbIcon}
                alt="facebook icon"
                className={classes.socialIcons}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles, {withTheme: true})(Footer)
