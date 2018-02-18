import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUnread } from '../actions'
import { NavBar, Notifications } from '../components'

class Unread extends Component {
  static navigationOptions = {
    header: <NavBar title="Unread" />
  }

  componentDidMount = () => {
    const { getUnread } = this.props

    getUnread()
  }

  render() {
    const { data, loading } = this.props

    return <Notifications notifications={data} loading={loading} />
  }
}

const mapStateToProps = state => {
  const { data, loading } = state.unread

  return {
    data,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUnread: () => dispatch(getUnread())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Unread)
