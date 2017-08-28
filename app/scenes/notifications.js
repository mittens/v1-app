import React, { Component } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  StyleSheet,
  View
} from 'react-native'

import { Main, NavBar } from '../components'
import { oauth } from '../lib'
import { Colors, Fonts, Layout } from '../styles'

export default class Notifications extends Component {
  static navigationOptions = {
    title: 'Notifications',
    header: () => <NavBar title="Notifications" />
  }

  state = {
    loading: true
  }

  async componentWillMount() {
    const { data: notifications } = await oauth.manager.makeRequest(
      'github',
      'https://api.github.com/notifications?all=1'
    )

    this.setState({
      notifications,
      loading: false
    })
  }

  renderItem(notification) {
    return (
      <View style={styles.container}>
        <Text>
          {notification.subject.title}
        </Text>
      </View>
    )
  }

  renderSeparator() {
    return <View style={styles.separator} />
  }

  render() {
    const { loading, notifications } = this.state

    if (loading) {
      return (
        <Main style={styles.loading}>
          <ActivityIndicator color={Colors.primary} />
        </Main>
      )
    }

    return (
      <Main>
        <FlatList
          data={notifications}
          renderItem={({ item }) => this.renderItem(item)}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item.id}
        />
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.margin * 2
  },
  container: {
    padding: Layout.margin
  },
  separator: {
    backgroundColor: Colors.borderLight,
    height: 1
  }
})
