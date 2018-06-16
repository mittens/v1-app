import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getNotifications, markRead } from '../actions'
import { NavBar, Notifications } from '../components'
import { link } from '../lib'

class Unread extends Component {
  static navigationOptions = {
    header: <NavBar title="New" />
  }

  componentDidMount = () => {
    const { getNotifications } = this.props

    getNotifications()
  }

  onPress = notification => {
    const { markRead } = this.props
    const { updated_at } = notification

    markRead(updated_at)

    link.open(notification)
  }

  render() {
    const { notifications, loading } = this.props

    return (
      <Notifications
        notifications={notifications}
        loading={loading}
        onPress={this.onPress}
        reload={this.componentDidMount}
      />
    )
  }
}

const mapStateToProps = state => {
  const { data, loading } = state.notifications

  const notifications = data.filter(notification => notification.unread)

  return {
    notifications,
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
)(Unread)
