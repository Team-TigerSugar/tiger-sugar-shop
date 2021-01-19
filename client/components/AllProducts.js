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
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  addButt: {
    backgroundColor: theme.palette.common.colorFour
  },
  // not sure how to apply this root stuff!
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
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
        <Grid container justify="center">
          <Grid item container direction="column" alignItems="center">
            {products.map(product => (
              <Card key={product.id} style={{width: '50%'}} elevation={4}>
                <Link to={`/products/${product.id}`} key={product.id}>
                  <img className="browsingImg" src={product.img} />
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body2">
                    {(product.price * 0.01).toFixed(2)}
                  </Typography>
                </Link>
                <Button
                  className={classes.addButt}
                  type="submit"
                  onClick={this.handleClick}
                  value={product.id}
                >
                  Add To Cart
                </Button>
              </Card>
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
