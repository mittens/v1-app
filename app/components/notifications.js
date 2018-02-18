import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { Main, Notification, Separator, Spinner, Touchable } from './'
import { Colors, Layout } from '../styles'

export default class Notifications extends Component {
  renderEmpty = () => {
    const { loading } = this.props

    if (loading) {
      return null
    }

    return <Text style={styles.empty}>Nothing here</Text>
  }

  renderItem = ({ item }) => {
    return <Notification notification={item} />
  }

  render() {
    const { notifications, loading } = this.props

    return (
      <Main>
        <FlatList
          data={notifications}
          ItemSeparatorComponent={Separator}
          keyExtractor={item => item.id}
          ListEmptyComponent={this.renderEmpty}
          onRefresh={this.componentDidMount}
          refreshing={loading}
          renderItem={this.renderItem}
        />
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  unread: {
    backgroundColor: Colors.backgroundDark
  },
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Layout.margin
  },
  image: {
    borderRadius: 20,
    height: 40,
    resizeMode: 'contain',
    width: 40
  },
  details: {
    flex: 1,
    marginLeft: Layout.margin
  },
  title: {
    color: Colors.text
  },
  repository: {
    color: Colors.textLight,
    fontSize: 12,
    marginVertical: Layout.padding
  },
  footer: {
    flexDirection: 'row'
  },
  time: {
    color: Colors.textLight,
    fontSize: 12
  },
  updated: {
    marginLeft: Layout.padding
  },
  empty: {
    alignSelf: 'center',
    color: Colors.textLight,
    margin: Layout.margin
  }
})
