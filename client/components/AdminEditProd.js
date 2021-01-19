import React from 'react'
import {Link} from 'react-router-dom'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    backgroundColor: theme.palette.common.colorTwo,
    marginTop: '2em',
    fontFamily: 'Lato',
    textTransform: 'none'
  }
})

class AdminEditProd extends React.Component {
  render() {
    const {classes} = this.props

    return (
      <Grid container direction="column" alignItems="center">
        <Grid item style={{width: '50%'}}>
          <Typography align="center" variant="h1">
            Edit PRODUCT_NAME
          </Typography>
        </Grid>
        <Grid
          item
          container
          // direction="column"
          style={{width: '50%', marginTop: '4em'}}
          justify="center"
        >
          <TextField label="Image Url" variant="filled" />
          <TextField
            label="Product Name"
            variant="filled"
            style={{marginRight: '2em', marginLeft: '2em'}}
          />
          <TextField label="Product Price" variant="filled" />
          <TextField
            label="Description"
            multiline
            rows={5}
            fullWidth
            variant="filled"
            style={{marginTop: '2em'}}
          />
        </Grid>
        <Grid item>
          <Button classes={{root: classes.button}}>Update</Button>
        </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles, {withTheme: true})(AdminEditProd)

{
  /* <TextField
                label="Email"
                name="email"
                variant="filled"
                className={classes.inputField}
                onChange={this.changeHander}
                style={{marginBottom: '2em'}}
              /> */
}
