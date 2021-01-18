import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import {compose} from 'redux'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {addToCartThunk, deleteFromCartThunk} from '../store/cart'

const styles = theme => ({
  addButt: {
    backgroundColor: theme.palette.common.colorTwo
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

    if (products) {
      return (
        <Grid container justify="center">
          <Grid container>
            {products.map(product => (
              <Grid item container key={product.id}>
                <Link to={`/products/${product.id}`} key={product.id}>
                  <img src={product.img} />
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body2">
                    {(product.price * 0.01).toFixed(2)}
                  </Typography>
                </Link>
                <Button
                  type="submit"
                  onClick={this.handleClick}
                  value={product.id}
                >
                  Add To Cart
                </Button>
              </Grid>
            ))}
          </Grid>
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
