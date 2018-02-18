import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getUnread, markRead } from '../actions'
import { NavBar, Notifications } from '../components'
import { link } from '../lib'

class Unread extends Component {
  static navigationOptions = {
    header: <NavBar title="Unread" />
  }

  componentDidMount = () => {
    const { getUnread } = this.props

    getUnread()
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
      />
    )
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
    getUnread: () => dispatch(getUnread()),
    markRead: time => dispatch(markRead(time))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Unread)
