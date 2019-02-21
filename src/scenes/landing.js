import React, { Component } from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { login } from '../actions'
import { mittens } from '../assets'
import { Login, Text } from '../components'
import { Layout, Colors } from '../styles'

class Landing extends Component {
  render() {
    const { loading, login } = this.props

    return (
      <SafeAreaView style={styles.main}>
        <Image style={styles.mittens} source={mittens} />
        <Text style={styles.title} color={Colors.accent} title>
          mittens
        </Text>
        <Text center>brings you push notifications {'\n'} from GitHub</Text>
        <Login loading={loading} onLogin={token => login(token)} />
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
)(Landing)
