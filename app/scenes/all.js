import React, { Component } from 'react'
import { connect } from 'react-redux'

import { markRead } from '../actions'
import { NavBar, Notifications } from '../components'
import { link } from '../lib'

class All extends Component {
  static navigationOptions = {
    header: <NavBar title="Notifications" />
  }

  onPress = notification => {
    const { markRead } = this.props
    const { unread, updated_at } = notification

    if (unread) {
      markRead(updated_at)
    }

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
  const { data, loading } = state.notifications

  return {
    data,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    markRead: time => dispatch(markRead(time))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(All)
