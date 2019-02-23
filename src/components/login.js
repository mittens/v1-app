import React, { Component } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native'

import { close, mittens } from '../assets'
import { Colors, Layout, Fonts } from '../styles'

import Button from './button'
import Text from './text'
import Touchable from './touchable'

export default class Login extends Component {
  state = {
    token: '',
    visible: false
  }

  toggle = () => {
    const { visible } = this.state

    this.setState({
      visible: !visible
    })
  }

  github = () => {
    Linking.openURL('https://github.com/settings/tokens/new')
  }

  login = () => {
    const { onLogin } = this.props
    const { token } = this.state

    if (token) {
      onLogin(token)
    }
  }

  render() {
    const { loading } = this.props
    const { token, visible } = this.state

    return (
      <View>
        <Button style={styles.open} label="login" onPress={this.toggle} />
        <Modal
          animationType="fade"
          onRequestClose={this.toggle}
          transparent
          visible={visible}
        >
          <SafeAreaView style={styles.modal}>
            <KeyboardAvoidingView behavior="padding">
              <ScrollView
                style={styles.main}
                contentContainerStyle={styles.scroll}
              >
                <View style={styles.header}>
                  <Image style={styles.mittens} source={mittens} />
                  <Text style={styles.title} color={Colors.accent} subtitle>
                    login with GitHub personal access token
                  </Text>
                  <Touchable onPress={this.toggle}>
                    <Image style={styles.close} source={close} />
                  </Touchable>
                </View>
                <Button
                  style={styles.github}
                  label="open GitHub"
                  onPress={this.github}
                />
                <Text>
                  1. go to GitHub &#9656; Settings &#9656; Developer settings
                  &#9656; Personal access tokens &#9656; Generate new token
                </Text>
                <Text style={styles.text}>
                  2. name the token <Text bold>Mittens</Text>, or whatever
                </Text>
                <Text style={styles.text}>
                  3. select only the <Text bold>notifications</Text> scope
                </Text>
                <Text style={styles.text}>
                  4. paste the token below and press login
                </Text>
                <TextInput
                  style={styles.token}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={token => this.setState({ token })}
                  placeholder="personal access token"
                  placeholderTextColor={Colors.textLight}
                  value={token}
                />
                <Button
                  style={styles.login}
                  label="login"
                  loading={loading}
                  onPress={this.login}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  open: {
    marginTop: Layout.margin * 2,
    paddingHorizontal: Layout.margin
  },
  modal: {
    alignItems: 'center',
    backgroundColor: Colors.modal,
    flex: 1,
    justifyContent: 'center'
  },
  main: {
    backgroundColor: Colors.background,
    borderRadius: Layout.padding,
    flexGrow: 0,
    margin: Layout.margin * 2
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Layout.margin
  },
  mittens: {
    height: Layout.mittens.height / 3,
    width: Layout.mittens.width / 3
  },
  title: {
    flex: 1,
    marginHorizontal: Layout.margin
  },
  close: {
    height: Layout.footer.icon.height,
    width: Layout.footer.icon.width
  },
  scroll: {
    padding: Layout.margin
  },
  github: {
    backgroundColor: Colors.primary,
    marginBottom: Layout.margin
  },
  text: {
    marginTop: Layout.padding
  },
  token: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: Layout.border.radius,
    fontSize: Fonts.size.regular,
    height: Layout.textBox.height,
    marginTop: Layout.margin,
    paddingHorizontal: Layout.margin * (3 / 4)
  },
  login: {
    marginTop: Layout.padding
  }
})
