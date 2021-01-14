import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.setSingleProduct(productId)
    console.log('hi from componentDidMount')
  }

  render() {
    const product = this.props.product
    console.log('this.props', this.props)

    if (product) {
      return (
        <div>
          <div key={product.id}>
            <img src={product.img} />
            <h2>{product.name}</h2>
            <h3>{product.price}</h3>
            <p>{product.description}</p>
          </div>
        </div>
      )
    } else {
      return <div>Single product render failed</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => ({
  setSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
