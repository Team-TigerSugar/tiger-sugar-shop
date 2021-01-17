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
import {addToCartThunk, deleteFromCartThunk} from '../store/cart'

const styles = theme => ({
  addButt: {
    backgroundColor: theme.palette.common.colorTwo
  }
})

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const productId = this.props.match.params.productId
    await this.props.setSingleProduct(productId)
    //  console.log('hi from componentDidMount')
  }

  async handleClick(e) {
    e.preventDefault()
    const userId = this.props.user.id
    const itemId = e.currentTarget.value
    await this.props.addToCart(userId, itemId)
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
              <Typography variant="body1">{product.price}</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </CardContent>
          </CardActionArea>
          <Button type="submit" onClick={this.handleClick} value={product.id}>
            Add To Cart
          </Button>
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  setSingleProduct: id => dispatch(fetchSingleProduct(id)),
  addToCart: (userId, itemId, qty) =>
    dispatch(addToCartThunk(userId, itemId, qty))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(SingleProduct)
