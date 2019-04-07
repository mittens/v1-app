import React, { Component, Fragment } from 'react'
import {
  AppState,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'

import {
  getNotifications,
  logout,
  markAllAsRead,
  markAsRead,
  updatePushToken
} from '../actions'
import { mittens } from '../assets'
import { dialog, github } from '../lib'
import { NavBar, Notification, TabBar, Text } from '../components'
import { Colors, Layout } from '../styles'

class Notifications extends Component {
  state = {
    unread: false
  }

  componentDidMount() {
    const { user, getNotifications, updatePushToken } = this.props

    if (user) {
      const { github_token } = user

      github.setToken(github_token)
    }

    getNotifications()
    updatePushToken()

    AppState.addEventListener('change', this.appStateChanged)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.appStateChanged)
  }

  appStateChanged = state => {
    if (state === 'active') {
      const { getNotifications } = this.props

      getNotifications()
    }
  }

  toggle = () => {
    const { unread } = this.state

    this.setState({
      unread: !unread
    })
  }

  logout = async () => {
    const confirm = await dialog.confirm('Are you sure you want to log out?')

    if (confirm) {
      const { logout } = this.props

      logout()
    }
  }

  renderItem = ({ item }) => {
    const { markAsRead } = this.props

    return <Notification item={item} markAsRead={markAsRead} />
  }

  renderEmpty = () => {
    const { loading } = this.props

    return (
      <View style={styles.empty}>
        <Image style={styles.mittens} source={mittens} />
        {!loading && (
          <Fragment>
            <Text style={styles.clear}>all clear</Text>
            <Text color={Colors.textLight}>what a sight</Text>
          </Fragment>
        )}
      </View>
    )
  }

  refreshControl = () => {
    const { loading, getNotifications } = this.props

    return (
      <RefreshControl
        colors={[Colors.primary, Colors.accent]}
        onRefresh={getNotifications}
        refreshing={loading}
        size={RefreshControl.SIZE.DEFAULT}
        tintColor={Colors.primary}
      />
    )
  }

  render() {
    const { notifications, markAllAsRead } = this.props
    const { unread } = this.state

    const data = notifications.filter(notification =>
      unread ? notification.unread === true : true
    )

    return (
      <View style={styles.main}>
        <NavBar
          title={unread ? 'unread' : 'notifications'}
          markAllAsRead={markAllAsRead}
        />
        <FlatList
          contentContainerStyle={styles.content}
          data={data}
          keyExtractor={({ id }) => id}
          ListEmptyComponent={this.renderEmpty}
          refreshControl={this.refreshControl()}
          renderItem={this.renderItem}
        />
        <TabBar logout={this.logout} toggle={this.toggle} unread={unread} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  content: {
    flexGrow: 1
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  mittens: {
    ...Layout.mittens
  },
  clear: {
    marginTop: Layout.margin
  }
})

const mapStateToProps = ({
  notifications: { error, loading, notifications },
  user: { user }
}) => ({
  error,
  loading,
  notifications,
  user
})

const mapDispatchToProps = dispatch => ({
  getNotifications: () => dispatch(getNotifications()),
  logout: () => dispatch(logout()),
  markAllAsRead: () => dispatch(markAllAsRead()),
  markAsRead: (notification, open) => dispatch(markAsRead(notification, open)),
  updatePushToken: () => dispatch(updatePushToken())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
