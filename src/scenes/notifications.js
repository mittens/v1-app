import React, { Component, Fragment } from 'react'
import {
  AppState,
  Image,
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  View
} from 'react-native'
import { connect } from 'react-redux'

import {
  getNotifications,
  markAllAsRead,
  markAsRead,
  updatePushToken
} from '../actions'
import { mark_all_as_read, mittens } from '../assets'
import { github } from '../lib'
import { Notification, Text, Touchable } from '../components'
import { Colors, Layout } from '../styles'

class Notifications extends Component {
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

  renderSectionHeader = ({ section: { data, title } }) => {
    if (data.length === 0) {
      return null
    }

    const { markAllAsRead } = this.props

    return (
      <View style={styles.header}>
        <Text style={styles.title} title>
          {title}
        </Text>
        {title === 'unread' && (
          <Touchable style={styles.markAllAsRead} onPress={markAllAsRead}>
            <Image style={styles.icon} source={mark_all_as_read} />
          </Touchable>
        )}
      </View>
    )
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
    const { notifications } = this.props

    const sections = [
      {
        title: 'unread',
        data: notifications.filter(({ unread }) => unread === true)
      },
      {
        title: 'notifications',
        data: notifications.filter(({ unread }) => unread === false)
      }
    ]

    return (
      <SafeAreaView style={styles.main}>
        <SectionList
          contentContainerStyle={styles.content}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={this.renderEmpty}
          refreshControl={this.refreshControl()}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          sections={sections}
        />
      </SafeAreaView>
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
  header: {
    alignItems: 'center',
    backgroundColor: Colors.background,
    flexDirection: 'row',
    paddingTop: Layout.margin
  },
  title: {
    flex: 1,
    marginHorizontal: Layout.margin
  },
  markAllAsRead: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  icon: {
    height: Layout.footer.icon.height,
    margin: Layout.margin,
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
  markAllAsRead: () => dispatch(markAllAsRead()),
  markAsRead: (notification, open) => dispatch(markAsRead(notification, open)),
  updatePushToken: () => dispatch(updatePushToken())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
