import { dialog, firebase } from '../lib'

export default () => async (dispatch, getState) => {
  try {
    const {
      user: { user }
    } = getState()

    await firebase.requestPermissions()

    const token = await firebase.token()

    await firebase.updatePushToken(user, token)
  } catch (error) {
    const { message } = error

    dialog.alert(message)
  }
}
