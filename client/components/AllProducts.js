import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products

    if (products) {
      return (
        <div>
          <div>
            {products.map(product => (
              <div key="product.id">
                <Link to={`/products/${product.id}`} key={product.id}>
                  <img src={product.img} />
                  <h2>{product.name}</h2>
                  <h3>{product.price}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return <div>HI</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
