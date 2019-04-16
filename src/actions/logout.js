import { dialog, firebase } from '../lib'
import { persistor } from '../store'

export default () => async (dispatch, getState) => {
  try {
    const confirm = await dialog.confirm('are you sure you want to log out?')

    if (!confirm) {
      return
    }

    const {
      user: { user }
    } = getState()

    await persistor.purge()

    await firebase.logout(user)
  } catch (error) {
    const { message } = error

    dialog.alert(message)
  }
}
