import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {updateProductThunk} from '../store/products'

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
  constructor(props) {
    super(props)
    this.state = {
      img: this.props.products.img,
      name: this.props.products.name,
      price: this.props.products.price,
      description: this.props.products.description
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }
  async handleSubmit(event) {
    event.preventDefault()
    let editedProd = {
      img: this.state.img,
      name: this.state.name,
      price: this.state.price,
      description: this.state.description
    }
    await this.props.updateProduct(this.props.products.id, editedProd)
  }

  changeHandler(event) {
    this.setState({[event.currentTarget.name]: event.currentTarget.value})
  }
  render() {
    const {classes} = this.props

    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Grid container direction="column" alignItems="center">
            <Grid item style={{width: '50%'}}>
              <Typography align="center" variant="body1">
                Edit
              </Typography>
            </Grid>
            <Grid item container style={{marginTop: '1em'}} justify="center">
              <TextField
                name="img"
                label="Image Url"
                variant="filled"
                onChange={this.changeHandler}
              />
              <TextField
                name="name"
                label="Product Name"
                variant="filled"
                onChange={this.changeHandler}
                style={{marginRight: '2em', marginLeft: '2em'}}
              />
              <TextField
                name="price"
                label="Product Price"
                variant="filled"
                onChange={this.changeHandler}
              />
              <TextField
                name="description"
                label="Description"
                multiline
                rows={5}
                //  fullWidth
                variant="filled"
                onChange={this.changeHandler}
                style={{marginTop: '2em', width: '100%'}}
              />
            </Grid>
            <Grid item>
              <Button type="submit" classes={{root: classes.button}}>
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => ({
  updateProduct: (productId, editedProd) =>
    dispatch(updateProductThunk(productId, editedProd))
})

export default compose(
  connect(null, mapDispatch),
  withStyles(styles, {withTheme: true})
)(AdminEditProd)
