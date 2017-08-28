import React, { Component } from 'react'
import { ActivityIndicator, Image, Text, StyleSheet, View } from 'react-native'

import { Main, NavBar } from '../components'
import { oauth } from '../lib'
import { Colors, Fonts, Layout } from '../styles'

export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
    header: () => <NavBar title="Profile" />
  }

  state = {
    loading: true
  }

  async componentWillMount() {
    const { data: profile } = await oauth.manager.makeRequest(
      'github',
      'https://api.github.com/user'
    )

    const { avatar_url: avatar, bio: about, name } = profile

    this.setState({
      loading: false,
      user: {
        about,
        avatar,
        name
      }
    })
  }

  render() {
    const { loading, user } = this.state

    if (loading) {
      return (
        <Main style={styles.container}>
          <ActivityIndicator color={Colors.primary} />
        </Main>
      )
    }

    return (
      <Main style={styles.container}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <Text style={styles.name}>
          {user.name}
        </Text>
        <Text style={styles.about}>
          {user.about}
        </Text>
      </Main>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.margin * 2
  },
  avatar: {
    borderRadius: 50,
    height: 100,
    width: 100
  },
  name: {
    ...Fonts.heading,
    marginVertical: Layout.margin
  },
  about: {
    textAlign: 'center'
  }
})
