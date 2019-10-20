import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions'
import messaging from '@react-native-firebase/messaging'

import { storage } from './storage'

class Firebase {
  async auth(code: string): Promise<string> {
    const {
      data: { access_token }
    } = await functions().httpsCallable('auth')({
      code
    })

    if (!access_token) {
      throw new Error('invalid auth code')
    }

    return access_token
  }

  async login(github_token: string, username: string): Promise<void> {
    const credential = auth.GithubAuthProvider.credential(github_token)

    const {
      user: { uid }
    } = await auth().signInWithCredential(credential)

    await messaging().requestPermission()
    await messaging().getAPNSToken()

    const push_token = await messaging().getToken()

    await firestore()
      .collection('users')
      .doc(username)
      .set({
        github_token,
        push_token,
        uid,
        username
      })
  }

  async logout() {
    const login = await storage.get('@login')

    if (login) {
      await firestore()
        .collection('users')
        .doc(login)
        .delete()
    }

    return auth().signOut()
  }

  onUser(callback: FirebaseAuthTypes.AuthListenerCallback) {
    return auth().onAuthStateChanged(callback)
  }

  async updateToken() {
    await messaging().requestPermission()
    await messaging().getAPNSToken()

    const push_token = await messaging().getToken()

    const login = await storage.get('@login')

    if (login && push_token) {
      firestore()
        .collection('users')
        .doc(login)
        .update({
          push_token
        })
    }
  }
}

export const firebase = new Firebase()
