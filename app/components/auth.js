import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, WebView } from 'react-native'
import parse from 'url-parse'

import { Main, Spinner } from '.'
import { api } from '../lib'

export default class Auth extends Component {
  state = {
    loading: true,
    uri: null
  }

  componentDidMount = async () => {
    this.github = await api.get('/github')

    const { base, id, scope } = this.github

    this.setState({
      loading: false,
      uri: `${base}/authorize?client_id=${id}&scope=${scope}`
    })
  }

  onNavigationStateChange = async ({ url }) => {
    const parsed = parse(url, true)

    const { protocol, query } = parsed
    const { code } = query

    if (protocol === 'github:' && code) {
      this.setState({
        loading: true,
        uri: null
      })

      const { base, id, secret } = this.github

      const response = await fetch(
        `${base}/access_token?client_id=${id}&client_secret=${secret}&code=${code}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      )

      const json = await response.json()

      const { access_token } = json

      const { onToken } = this.props

      onToken(access_token)
    }
  }

  renderLoading = () => {
    return (
      <Main style={styles.spinner}>
        <Spinner full />
      </Main>
    )
  }

  render() {
    const { loading, uri } = this.state

    if (loading) {
      return this.renderLoading()
    }

    if (!uri) {
      return null
    }

    const source = {
      uri
    }

    return (
      <SafeAreaView style={styles.main}>
        <WebView
          source={source}
          startInLoadingState={true}
          onNavigationStateChange={this.onNavigationStateChange}
          scalesPageToFit={false}
          renderLoading={this.renderLoading}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
