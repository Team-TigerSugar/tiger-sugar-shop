import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {adminFetchUsersThunk} from '../store/allUsers'
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

class AdminCustomers extends React.Component {
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
    await this.props.getUsers(userId)
    console.log('user from Admin component', this.props.user)
  }

  render() {
    const {classes, users} = this.props

    return (
      <TableContainer className={classes.test}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">ID Number</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.lastName}</TableCell>
                <TableCell align="right">{user.firstName}</TableCell>
                <TableCell align="right">{user.city}</TableCell>
                <TableCell align="right">{user.state}</TableCell>
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
    users: state.allUsers,
    user: state.user,
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers: userId => dispatch(adminFetchUsersThunk(userId)),
  getMe: () => dispatch(me())
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme: true})
)(AdminCustomers)
