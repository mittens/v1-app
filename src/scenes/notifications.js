import React, { Component } from 'react'
import { FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  getNotifications,
  logout,
  markAllAsRead,
  markAsRead,
  updatePushToken
} from '../actions'
import { mittens } from '../assets'
import { firebase, github } from '../lib'
import { NavBar, TabBar, Text, Touchable } from '../components'
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

    this.listener = firebase.onNotification(notification => {
      if (notification) {
        getNotifications()
      }
    })
  }

  componentWillUnmount() {
    this.listener()
  }

  toggle = () => {
    const { unread } = this.state

    this.setState({
      unread: !unread
    })
  }

  renderItem = ({ item }) => {
    const { markAsRead } = this.props

    const {
      unread,
      updated_at,
      repository: {
        name,
        owner: { avatar_url }
      },
      subject: { title }
    } = item

    return (
      <Touchable style={[styles.item]} onPress={() => markAsRead(item)}>
        <Image style={styles.image} source={{ uri: avatar_url }} />
        <View style={styles.details}>
          <Text
            style={styles.subject}
            color={unread ? Colors.text : Colors.textLight}
            semibold
          >
            {title}
          </Text>
          <Text color={Colors.textLight} small>
            {name}, {moment(updated_at).fromNow()}
          </Text>
        </View>
      </Touchable>
    )
  }

  renderEmpty = () => {
    const { notifications, loading } = this.props

    if (notifications.length === 0 && loading) {
      return
    }

    return (
      <View style={styles.empty}>
        <Image style={styles.mittens} source={mittens} />
        <Text style={styles.clear}>all clear</Text>
        <Text color={Colors.textLight}>what a sight</Text>
      </View>
    )
  }

  refreshControl = () => {
    const { loading, getNotifications } = this.props

    return (
      <RefreshControl
        onRefresh={getNotifications}
        refreshing={loading}
        size="default"
        tintColor={Colors.primary}
      />
    )
  }

  render() {
    const { notifications, logout, markAllAsRead } = this.props
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
          contentContainerStyle={{ flexGrow: 1 }}
          data={data}
          keyExtractor={({ id }) => id}
          ListEmptyComponent={this.renderEmpty}
          refreshControl={this.refreshControl()}
          renderItem={this.renderItem}
        />
        <TabBar logout={logout} toggle={this.toggle} unread={unread} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.margin
  },
  image: {
    borderRadius: Layout.border.radius,
    height: Layout.avatar.height,
    width: Layout.avatar.width
  },
  details: {
    flex: 1,
    marginLeft: Layout.margin
  },
  subject: {
    marginBottom: Layout.padding
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
  markAsRead: notification => dispatch(markAsRead(notification)),
  updatePushToken: () => dispatch(updatePushToken())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
