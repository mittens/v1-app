import firebase from 'react-native-firebase'

import { github } from '../lib'

class Firebase {
  async login(token) {
    github.setToken(token)

    const { login } = await github.getUser()

    const credentials = await firebase.auth().signInAnonymously()

    await firebase
      .firestore()
      .collection('users')
      .doc(login)
      .set({
        github_token: token,
        uid: credentials.user.uid,
        username: login
      })

    const user = await this.user(login).get()

    return user.data()
  }

  user(username) {
    return firebase
      .firestore()
      .collection('users')
      .doc(username)
  }

  requestPermissions() {
    return firebase.messaging().requestPermission()
  }

  token() {
    return firebase.messaging().getToken()
  }

  updatePushToken(user, token) {
    const { username } = user

    return firebase
      .firestore()
      .collection('users')
      .doc(username)
      .update({
        notifications: true,
        push_token: token
      })
  }

  async logout(user) {
    const { username } = user

    await firebase
      .firestore()
      .collection('users')
      .doc(username)
      .delete()

    return firebase.auth().currentUser.delete()
  }
}

export default new Firebase()
