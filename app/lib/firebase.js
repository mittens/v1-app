import Firebase from 'react-native-firebase'

const firebase = Firebase.initializeApp({
  debug: __DEV__
})

export default firebase
