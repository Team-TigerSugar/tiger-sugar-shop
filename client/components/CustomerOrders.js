import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {myOrderHistoryThunk} from '../store/orderHistory'
import {me} from '../store'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const styles = theme => ({
  root: {
    maxWidth: 400,
    backgroundColor: theme.palette.common.colorThree,
    margin: 70
  },
  pos: {
    justifyContent: 'center',
    marginBottom: 12
  }
})

class CustomerOrders extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    try {
      await this.props.getMe()
    } catch (err) {
      console.log(err)
    }
    const userId = this.props.user.id
    await this.props.getMyOrders(userId)
    console.log('user from CustomerOrders component', this.props.user)
  }

  render() {
    const {classes, orders, cartItems, products} = this.props

    const reducer = (accumulator, currentValue) => accumulator + currentValue

    return (
      <React.Fragment>
        <Grid container justify="center">
          <Typography variant="h1">Your Order History</Typography>
        </Grid>
        <Grid container>
          <Grid item container direction="row">
            {orders.map(order => (
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="body1">Order ID Number:</Typography>
                  <Typography variant="body2">{order.id}</Typography>
                  <Typography variant="body1">Date Placed:</Typography>
                  <Typography variant="body2">{order.createdAt}</Typography>
                  <Typography variant="body1">Products Ordered:</Typography>
                  <Typography variant="body2">
                    {order.products.map(product => (
                      <Link to={`/products/${product.id}`}>
                        <Typography>
                          ${(product.price * 0.01).toFixed(2)}...
                          {product.name}
                          {' x'}
                          {product.cartItems.qty}
                        </Typography>
                      </Link>
                    ))}
                  </Typography>
                  <Typography variant="body1">Order Total:</Typography>
                  <Typography variant="body2">
                    {(
                      order.products
                        .map(product => {
                          return product.price * product.cartItems.qty
                        })
                        .reduce(reducer, 0) * 0.01
                    ).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderHistory,
    user: state.user,
    id: state.user.id,
    products: state.cart.products
  }
}

const mapDispatchToProps = dispatch => ({
  getMyOrders: userId => dispatch(myOrderHistoryThunk(userId)),
  getMe: () => dispatch(me())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(CustomerOrders)
