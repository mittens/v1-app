import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAll } from '../actions'
import { NavBar, Notifications } from '../components'

class All extends Component {
  static navigationOptions = {
    header: <NavBar title="Notifications" />
  }

  componentDidMount = () => {
    const { getAll } = this.props

    getAll()
  }

  render() {
    const { data, loading } = this.props

    return <Notifications notifications={data} loading={loading} />
  }
}

const mapStateToProps = state => {
  const { data, loading } = state.all

  return {
    data,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAll: () => dispatch(getAll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(All)
