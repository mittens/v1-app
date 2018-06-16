import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { Main, Notification, Separator } from '.'
import { check } from '../assets'
import { Colors, Layout } from '../styles'

const { height } = Dimensions.get('window')

export default class Notifications extends Component {
  renderEmpty = () => {
    const { loading } = this.props

    if (loading) {
      return null
    }

    return (
      <View style={styles.empty}>
        <Image style={styles.done} source={check} />
        <Text style={styles.message}>All done</Text>
      </View>
    )

    return
  }

  renderItem = ({ item }) => {
    const { onPress } = this.props

    return <Notification notification={item} onPress={onPress} />
  }

  render() {
    const { notifications, loading, reload } = this.props

    return (
      <Main>
        <FlatList
          data={notifications}
          ItemSeparatorComponent={Separator}
          keyExtractor={item => item.id}
          ListEmptyComponent={this.renderEmpty}
          onRefresh={reload}
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
    alignItems: 'center',
    height: (height * 3) / 4,
    justifyContent: 'center'
  },
  done: {
    height: height / 10,
    width: height / 10
  },
  message: {
    color: Colors.text,
    marginTop: Layout.margin
  }
})
