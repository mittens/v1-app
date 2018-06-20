import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNotifications, markRead } from '../actions'
import { NavBar, Notifications } from '../components'
import { link } from '../lib'

class All extends Component {
  static navigationOptions = {
    header: <NavBar title="Notifications" />
  }

  refresh = () => {
    const { getNotifications } = this.props

    getNotifications()
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
        highlight
        loading={loading}
        onPress={this.onPress}
        reload={this.refresh}
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
    getNotifications: () => dispatch(getNotifications()),
    markRead: time => dispatch(markRead(time))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(All)
