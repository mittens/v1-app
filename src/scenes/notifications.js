import React, { Component } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  getNotifications,
  logout,
  markAsRead,
  updatePushToken
} from '../actions'
import { exit, notifications_all, notifications_unread } from '../assets'
import { github } from '../lib'
import { NavBar, Text, Touchable } from '../components'
import { Layout, Colors } from '../styles'

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
  }

  toggle = () => {
    const { unread } = this.state

    this.setState({
      unread: !unread
    })
  }

  logout = () => {
    const { logout } = this.props

    logout()
  }

  renderItem = ({ item }) => {
    const { markAsRead } = this.props

    const {
      unread,
      updated_at,
      url,
      repository: {
        name,
        owner: { avatar_url }
      },
      subject: { title }
    } = item

    return (
      <Touchable
        style={[styles.item, !unread && styles.read]}
        onPress={() => markAsRead(item)}
      >
        <Image style={styles.image} source={{ uri: avatar_url }} />
        <View style={styles.details}>
          <Text style={styles.subject} semibold>
            {title}
          </Text>
          <Text color={Colors.textLight} small>
            {name}, {moment(updated_at).fromNow()}
          </Text>
        </View>
      </Touchable>
    )
  }

  render() {
    const { notifications, loading, getNotifications } = this.props
    const { unread } = this.state

    const data = notifications.filter(notification =>
      unread ? notification.unread === true : true
    )

    return (
      <View style={styles.main}>
        <NavBar title={unread ? 'unread' : 'notifications'} />
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          onRefresh={getNotifications}
          refreshing={loading}
          renderItem={this.renderItem}
        />
        <SafeAreaView style={styles.footer}>
          <Touchable style={styles.link} onPress={this.toggle}>
            <Image
              style={styles.icon}
              source={unread ? notifications_all : notifications_unread}
            />
            <Text>show {unread ? 'all' : 'unread'}</Text>
          </Touchable>
          <Touchable style={styles.link} onPress={this.logout}>
            <Image style={styles.icon} source={exit} />
            <Text>logout</Text>
          </Touchable>
        </SafeAreaView>
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
  read: {
    opacity: 0.5
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
  footer: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  link: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.footer.margin
  },
  icon: {
    height: Layout.footer.icon.height,
    marginRight: Layout.padding,
    width: Layout.footer.icon.width
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
  markAsRead: notification => dispatch(markAsRead(notification)),
  updatePushToken: () => dispatch(updatePushToken())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
