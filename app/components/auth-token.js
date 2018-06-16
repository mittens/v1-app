import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { Button, TextBox } from '.'
import { Colors, Fonts, Layout } from '../styles'

export default class AuthToken extends Component {
  state = {
    token: ''
  }

  onChangeText = token => {
    this.setState({
      token
    })
  }

  onToken = () => {
    const { onToken } = this.props
    const { token } = this.state

    if (token) {
      onToken(token)
    }
  }

  render() {
    const { onClose } = this.props

    const Main = Platform.OS === 'android' ? View : KeyboardAvoidingView

    return (
      <Modal animationType="fade" transparent={true} onRequestClose={onClose}>
        <Main style={styles.modal} behavior="padding">
          <View style={styles.main}>
            <Text style={styles.title}>Enter token from GitHub</Text>
            <TextBox
              style={styles.textbox}
              onChangeText={this.onChangeText}
              placeholder="Personal access token"
            />
            <View style={styles.footer}>
              <Button
                style={styles.login}
                label="Login"
                onPress={this.onToken}
              />
              <Button style={styles.cancel} label="Cancel" onPress={onClose} />
            </View>
          </View>
        </Main>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.modal,
    justifyContent: 'center'
  },
  main: {
    backgroundColor: Colors.background,
    borderRadius: Layout.borderRadius,
    margin: Layout.margin * 2,
    overflow: 'hidden'
  },
  title: {
    ...Fonts.subtitle,
    color: Colors.text,
    margin: Layout.margin,
    marginBottom: 0
  },
  textbox: {
    margin: Layout.margin
  },
  footer: {
    flexDirection: 'row'
  },
  login: {
    borderRadius: 0,
    flex: 1
  },
  cancel: {
    borderLeftColor: Colors.border,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRadius: 0,
    flex: 1
  }
})
