import React from 'react'
import {Link} from 'react-router-dom'
import {addProductThunk} from '../store/products'

import {connect} from 'react-redux'
import {compose} from 'redux'
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

class AdminAddNewProd extends React.Component {
  constructor() {
    super()
    this.state = {
      img: '',
      name: '',
      price: 0,
      description: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeHander = this.changeHander.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    let newProd = {
      img: this.state.img,
      name: this.state.name,
      price: this.state.price,
      description: this.state.description
    }
    await this.props.addProduct(newProd)
  }

  changeHander(event) {
    this.setState({[event.currentTarget.name]: event.currentTarget.value})
  }

  render() {
    const {classes} = this.props

    return (
      <Grid container direction="column" alignItems="center">
        <form onSubmit={this.handleSubmit}>
          <Grid item style={{width: '50%'}}>
            <Typography align="center" variant="h1">
              Create your new item here
            </Typography>
          </Grid>
          <Grid
            item
            container
            style={{width: '50%', marginTop: '4em'}}
            justify="center"
          >
            <TextField
              name="img"
              label="Image Url"
              variant="filled"
              onChange={this.changeHander}
            />
            <TextField
              name="name"
              label="Product Name"
              variant="filled"
              style={{marginRight: '2em', marginLeft: '2em'}}
              onChange={this.changeHander}
            />
            <TextField
              name="price"
              label="Product Price"
              variant="filled"
              onChange={this.changeHander}
            />
            <TextField
              name="description"
              label="Description"
              multiline
              rows={5}
              fullWidth
              variant="filled"
              style={{marginTop: '2em'}}
              onChange={this.changeHander}
            />
          </Grid>
          <Grid item>
            <Button type="submit" classes={{root: classes.button}}>
              Create
            </Button>
          </Grid>
        </form>
      </Grid>
    )
  }
}

const mapDispatch = dispatch => ({
  addProduct: newProd => dispatch(addProductThunk(newProd))
})

export default compose(
  connect(null, mapDispatch),
  withStyles(styles, {withTheme: true})
)(AdminAddNewProd)
