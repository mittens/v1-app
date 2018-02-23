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

  componentDidMount() {
    const { config } = this.props

    const { base, id, scope } = config

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
      const { onCode } = this.props

      onCode(code)

      this.setState({
        loading: true,
        uri: null
      })
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
