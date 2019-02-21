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
import {
  exit,
  help,
  mittens,
  notifications_all,
  notifications_unread
} from '../assets'
import { firebase, github } from '../lib'
import { Help, NavBar, Text, Touchable } from '../components'
import { Colors, Layout } from '../styles'

class Notifications extends Component {
  state = {
    unread: false,
    visible: false
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

  help = () => {
    const { visible } = this.state

    this.setState({
      visible: !visible
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
    const { loading } = this.props

    if (loading) {
      return null
    }

    return (
      <View style={styles.empty}>
        <Image style={styles.mittens} source={mittens} />
        <Text style={styles.clear}>all clear</Text>
        <Text color={Colors.textLight}>what a sight</Text>
      </View>
    )
  }

  render() {
    const { notifications, loading, getNotifications } = this.props
    const { unread, visible } = this.state

    const data = notifications.filter(notification =>
      unread ? notification.unread === true : true
    )

    return (
      <View style={styles.main}>
        <NavBar title={unread ? 'unread' : 'notifications'} />
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={data}
          keyExtractor={({ id }) => id}
          ListEmptyComponent={this.renderEmpty}
          onRefresh={getNotifications}
          refreshing={loading}
          renderItem={this.renderItem}
        />
        <SafeAreaView style={styles.footer}>
          <Touchable style={styles.link} onPress={this.toggle}>
            <Image
              style={styles.icon}
              source={unread ? notifications_unread : notifications_all}
            />
          </Touchable>
          <Touchable style={styles.link} onPress={this.help}>
            <Image style={styles.icon} source={help} />
          </Touchable>
          <Touchable style={styles.link} onPress={this.logout}>
            <Image style={styles.icon} source={exit} />
          </Touchable>
        </SafeAreaView>
        <Help onClose={this.help} visible={visible} />
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
    width: Layout.footer.icon.width
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
  markAsRead: notification => dispatch(markAsRead(notification)),
  updatePushToken: () => dispatch(updatePushToken())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
