import { dialog, firebase } from '../lib'

import { getUserSuccess } from './get-user'
import { getNotificationsSuccess } from './get-notifications'

export default () => async (dispatch, getState) => {
  try {
    const confirm = await dialog.confirm('Are you sure you want to log out?')

    if (!confirm) {
      return
    }

    const {
      user: { user }
    } = getState()

    dispatch(getUserSuccess(null))
    dispatch(getNotificationsSuccess([]))

    await firebase.logout(user)
  } catch (error) {
    const { message } = error

    dialog.alert(message)
  }
}
