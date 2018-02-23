import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAll, markRead } from '../actions'
import { NavBar, Notifications } from '../components'
import { link } from '../lib'

class All extends Component {
  static navigationOptions = {
    header: <NavBar title="Notifications" />
  }

  componentDidMount = () => {
    const { getAll } = this.props

    getAll()
  }

  onPress = notification => {
    const { markRead } = this.props
    const { updated_at } = notification

    markRead(updated_at)

    link.open(notification)
  }

  render() {
    const { data, loading } = this.props

    return (
      <Notifications
        notifications={data}
        loading={loading}
        onPress={this.onPress}
        reload={this.componentDidMount}
      />
    )
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
    getAll: () => dispatch(getAll()),
    markRead: time => dispatch(markRead(time))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(All)
