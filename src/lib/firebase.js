import firebase from 'react-native-firebase'

import { github } from '../lib'

class Firebase {
  async auth(code) {
    const auth = firebase.functions().httpsCallable('auth')

    const {
      data: { access_token }
    } = await auth({
      code
    })

    if (!access_token) {
      throw new Error('no token')
    }

    return access_token
  }

  async login(token) {
    const credential = firebase.auth.GithubAuthProvider.credential(token)

    const {
      user: { uid }
    } = await firebase.auth().signInWithCredential(credential)

    github.setToken(token)

    const { login } = await github.getUser()

    await firebase
      .firestore()
      .collection('users')
      .doc(login)
      .set({
        uid,
        github_token: token,
        username: login
      })

    const user = await this.user(login).get()

    return user.data()
  }

  onUser(callback) {
    return firebase
      .firestore()
      .collection('users')
      .doc(username)
      .onSnapshot(user => callback(user.data()))
  }

  requestPermissions() {
    return firebase.messaging().requestPermission()
  }

  token() {
    return firebase.messaging().getToken()
  }

  async clear() {
    await firebase.notifications().removeAllDeliveredNotifications()

    return this.badge(0)
  }

  async badge(number) {
    if (number >= 0) {
      return firebase.notifications().setBadge(number)
    } else {
      const current = await firebase.notifications().getBadge()

      return this.badge(current + number)
    }
  }

  async updateToken(user, token) {
    const { username } = user

    await firebase
      .firestore()
      .collection('users')
      .doc(username)
      .update({
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

    await firebase.auth().currentUser.delete()
  }
}

export default new Firebase()
