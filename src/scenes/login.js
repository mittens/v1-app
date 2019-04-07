import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { startAuth } from '../actions'
import { mittens } from '../assets'
import { Button, Text } from '../components'
import { Layout, Colors } from '../styles'

class Login extends Component {
  render() {
    const { loading, startAuth } = this.props

    return (
      <SafeAreaView style={styles.main}>
        <Image style={styles.mittens} source={mittens} />
        <Text style={styles.title} color={Colors.accent} title>
          mittens
        </Text>
        <Text center>brings you push notifications {'\n'} from GitHub</Text>
        {loading && (
          <ActivityIndicator style={styles.spinner} color={Colors.primary} />
        )}
        {!loading && (
          <Button
            style={styles.login}
            label="login with GitHub"
            onPress={startAuth}
          />
        )}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: Layout.margin
  },
  mittens: {
    ...Layout.mittens
  },
  title: {
    marginBottom: Layout.padding,
    marginTop: Layout.margin * 2
  },
  spinner: {
    marginTop: Layout.margin * 2
  },
  login: {
    marginTop: Layout.margin * 2
  }
})

const mapStateToProps = ({ user: { loading, user } }) => ({
  loading,
  user
})

const mapDispatchToProps = dispatch => ({
  startAuth: () => dispatch(startAuth())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
