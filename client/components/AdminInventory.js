import React from 'react'
import {Link} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {fetchProducts, removeProductThunk} from '../store/products'
import {addToCartThunk} from '../store/cart'
import AdminEditProd from './AdminEditProd'

import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import {shadows} from '@material-ui/system'
import Box from '@material-ui/core/Box'
import AdminAddNewProd from './AdminAddNewProd'

const styles = theme => ({
  button: {
    backgroundColor: theme.palette.common.colorTwo,
    marginTop: '2em',
    fontFamily: 'Lato',
    textTransform: 'none'
  }
})

class AdminInventory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editOpen: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.clickEditHandler = this.clickEditHandler.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  clickEditHandler(event) {
    event.preventDefault()
    this.setState({
      editOpen: !this.state.editOpen
    })
  }

  async handleClick(e) {
    e.preventDefault()
    const userId = this.props.user.id
    const itemId = e.currentTarget.value
    await this.props.addToCart(userId, itemId)
  }

  render() {
    const {classes} = this.props
    const products = this.props.products
    return (
      <Grid container>
        <Grid container justify="center">
          <Button
            component={Link}
            to="/addinventory"
            variant="filled"
            classes={{root: classes.button}}
          >
            Add a New Item
          </Button>
        </Grid>
        <Grid item container justify="center" alignItems="flex-end">
          {products.map(product => (
            <Box
              key={product.id}
              justifyContent="space-around"
              justify="center"
              boxShadow={3}
              style={{
                width: '20em',
                marginTop: '5em',
                paddingBottom: '2em',
                paddingTop: '2em',
                marginRight: '2em'
              }}
            >
              <Grid container alignContent="flex-end">
                <Grid
                  item
                  container
                  component={Link}
                  to={`/products/${product.id}`}
                  key={product.id}
                  justify="center"
                >
                  <img
                    key={product.id}
                    src={product.img}
                    style={{width: '8em'}}
                  />
                </Grid>
                <Grid
                  item
                  container
                  key={product.id}
                  direction="column"
                  justify="center"
                  style={{marginTop: '1em'}}
                >
                  <Typography align="center" variant="body1">
                    {product.name}
                  </Typography>
                  <Typography align="center" variant="body2">
                    {(product.price * 0.01).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item container justify="center">
                  <Button
                    value={product.id}
                    onClick={() => this.props.deleteProduct(product.id)}
                    variant="contained"
                    classes={{root: classes.button}}
                  >
                    Delete
                  </Button>
                  <Button
                    type="button"
                    onClick={this.clickEditHandler}
                    variant="contained"
                    classes={{root: classes.button}}
                    style={{marginLeft: '1em'}}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
              {this.state.editOpen ? (
                <Grid className="update-info">
                  {product.id && <AdminEditProd products={product} />}
                </Grid>
              ) : (
                <div />
              )}
            </Box>
          ))}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  addToCart: (userId, itemId) => dispatch(addToCartThunk(userId, itemId)),
  deleteProduct: id => dispatch(removeProductThunk(id))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(AdminInventory)
