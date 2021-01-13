import React, {Component} from 'react'

export default class Cart extends Component {
  constructor() {
    super()
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      userType: 'Guest'
    }
  }

  render() {
    return (
      <div>
        <h1>CART</h1>
      </div>
    )
  }
}

//add an inCart column to Products
//if inCart === true, display it in the cart!
