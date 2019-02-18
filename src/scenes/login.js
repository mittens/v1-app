import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { login } from '../actions'
import { mittens } from '../assets'
import { Button, Text } from '../components'
import { dialog } from '../lib'
import { Layout, Colors } from '../styles'

class Login extends Component {
  login = async () => {
    const { login } = this.props

    const token = await dialog.login()

    login(token)
  }

  render() {
    const { loading } = this.props

    return (
      <SafeAreaView style={styles.main}>
        <Image style={styles.mittens} source={mittens} />
        <Text style={styles.title} color={Colors.accent} title>
          mittens
        </Text>
        <Text center>brings you push notifications {'\n'} from GitHub</Text>
        {loading && (
          <ActivityIndicator style={styles.loading} color={Colors.accent} />
        )}
        {!loading && (
          <Button style={styles.login} label="login" onPress={this.login} />
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
  loading: {
    marginTop: Layout.margin * 2
  },
  login: {
    marginTop: Layout.margin * 2,
    paddingHorizontal: Layout.margin
  }
})

const mapStateToProps = ({ user: { loading, user } }) => ({
  loading,
  user
})

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(login(token))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
