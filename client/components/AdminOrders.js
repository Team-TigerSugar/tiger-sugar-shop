import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {adminFetchOrdersThunk} from '../store/orderHistory'
import {me} from '../store'

import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {
  TableContainer,
  TableRow,
  Table,
  TableCell,
  TableHead,
  TableBody
} from '@material-ui/core'

const styles = theme => ({
  test: {
    color: theme.palette.common.colorOne,
    padding: 10
  },
  grid: {
    marginLeft: 10,
    marginTop: 40
  }
})

class AdminOrders extends React.Component {
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
    await this.props.getOrders(userId)
    console.log('user from AdminOrder component', this.props.user)
  }

  render() {
    const {classes, orders} = this.props

    return (
      <TableContainer className={classes.test}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">ID Number</TableCell>
              <TableCell align="right">User ID</TableCell>
              <TableCell align="right">Is Fulfilled</TableCell>
              <TableCell align="right">Date Created</TableCell>
              <TableCell align="right">Products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell align="right">{order.userId}</TableCell>
                <TableCell align="right">
                  {order.isOrder ? 'true' : 'false'}
                </TableCell>
                <TableCell align="right">{order.createdAt}</TableCell>
                <TableCell align="right">
                  {order.products.map(product => product.name + ', ')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
  getOrders: userId => dispatch(adminFetchOrdersThunk(userId)),
  getMe: () => dispatch(me())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(AdminOrders)
