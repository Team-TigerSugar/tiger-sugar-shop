import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import {compose} from 'redux'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {addToCartThunk} from '../store/cart'
import Box from '@material-ui/core/Box'
import Footer from './Footer'

const styles = theme => ({
  addButt: {
    backgroundColor: theme.palette.common.colorTwo
  },
  productImg: {
    objectFit: 'cover',
    borderRadius: '50%',
    height: '12.5em',
    width: '12.5em'
  }
})

class AllProducts extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  async handleClick(e) {
    e.preventDefault()
    const userId = this.props.user.id
    const itemId = e.currentTarget.value
    await this.props.addToCart(userId, itemId)
  }

  render() {
    const products = this.props.products

    const {classes} = this.props

    if (products) {
      return (
        <Grid container>
          <Grid
            item
            container
            alignItems="center"
            style={{marginTop: '5em'}}
            direction="column"
          >
            <Typography variant="h1">Here are all of our products</Typography>
            <Typography
              variant="body2"
              style={{width: '50%', marginTop: '2em'}}
              align="center"
            >
              Take a look around and be prepared to be mesmerized by our
              wonderful selection of life-changing products.
            </Typography>
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
                      //   style={{width: '8em'}}
                      className={classes.productImg}
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
                      classes={{root: classes.addButt}}
                      type="submit"
                      onClick={this.handleClick}
                      value={product.id}
                    >
                      Add To Cart
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Grid>
          <Footer />
        </Grid>
      )
    } else {
      return <div>WE'RE ALL OUT OF PRODUCS!! AAH!</div>
    }
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
  addToCart: (userId, itemId) => dispatch(addToCartThunk(userId, itemId))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(AllProducts)
