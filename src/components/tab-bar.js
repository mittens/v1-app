import React, { Component, Fragment } from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'

import { exit, help, notifications_all, notifications_unread } from '../assets'
import { Layout } from '../styles'

import Help from './help'
import Touchable from './touchable'

export default class TabBar extends Component {
  state = {
    visible: false
  }

  toggle = () => {
    const { visible } = this.state

    this.setState({
      visible: !visible
    })
  }

  render() {
    const { unread, toggle } = this.props
    const { visible } = this.state

    return (
      <Fragment>
        <SafeAreaView style={styles.main}>
          <Touchable style={styles.link} onPress={toggle}>
            <Image
              style={styles.icon}
              source={unread ? notifications_unread : notifications_all}
            />
          </Touchable>
          <Touchable style={styles.link} onPress={this.toggle}>
            <Image style={styles.icon} source={help} />
          </Touchable>
          <Touchable style={styles.link} onPress={this.logout}>
            <Image style={styles.icon} source={exit} />
          </Touchable>
        </SafeAreaView>
        <Help onClose={this.toggle} visible={visible} />
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  link: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Layout.footer.margin
  },
  icon: {
    height: Layout.footer.icon.height,
    width: Layout.footer.icon.width
  }
})
