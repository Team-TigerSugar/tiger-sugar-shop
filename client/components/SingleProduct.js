import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {compose} from 'redux'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import {fetchSingleProduct} from '../store/singleProduct'
import {me} from '../store'
import {getCartThunk, addToCartThunk} from '../store/cart'
import {cartItemThunk, updateCartItemThunk} from '../store/cartItem'
//import UpdateCart from './updateCart'

const styles = theme => ({
  addButt: {
    backgroundColor: theme.palette.common.colorTwo
  }
})

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    try {
      const productId = this.props.match.params.productId
      await this.props.setSingleProduct(productId)
      await this.props.getMe()
    } catch (err) {
      console.log(err)
    }
    const userId = this.props.user.id
    await this.props.getCart(userId)
    console.log('cart; ', this.props.cartItems)
  }

  handleChange(event) {
    this.setState({
      qty: event.currentTarget.value
    })
  }

  async handleClick(e) {
    e.preventDefault()
    const userId = this.props.user.id
    const itemId = e.currentTarget.value
    await this.props.addToCart(userId, itemId)
    const qty = this.state.qty
    console.log('this.state.qty: ', this.state, qty)
    await this.props.updateCartItem(userId, itemId, qty)
  }

  render() {
    const product = this.props.product
    //  console.log('this.props', this.props)

    if (product) {
      return (
        <Card justify="center">
          <CardActionArea key={product.id}>
            <img src={product.img} />
            <CardContent>
              <Typography variant="h1">{product.name}</Typography>
              <Typography variant="body1">
                ${(product.price * 0.01).toFixed(2)}
              </Typography>
              <Typography variant="body2">{product.description}</Typography>
            </CardContent>
          </CardActionArea>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.qty}
              onChange={this.handleChange}
            />
            <Button type="submit" onClick={this.handleClick} value={product.id}>
              Add To Cart
            </Button>
          </form>
        </Card>
      )
    } else {
      return <div>Single product render failed</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct,
    user: state.user,
    cartItems: state.cart.products,
    qty: state.cartItem.qty
  }
}

const mapDispatchToProps = dispatch => ({
  setSingleProduct: id => dispatch(fetchSingleProduct(id)),
  addToCart: (userId, itemId, qty) =>
    dispatch(addToCartThunk(userId, itemId, qty)),
  getMe: () => dispatch(me()),
  getCart: userId => dispatch(getCartThunk(userId)),
  getCartItem: (userId, itemId) => dispatch(cartItemThunk(userId, itemId)),
  updateCartItem: (userId, itemId, qty) =>
    dispatch(updateCartItemThunk(userId, itemId, qty))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(SingleProduct)
