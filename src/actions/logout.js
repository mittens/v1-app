import { dialog, firebase } from '../lib'

import { getUserSuccess } from './get-user'
import { getNotificationsSuccess } from './get-notifications'

export default () => async (dispatch, getState) => {
  try {
    const {
      user: { user }
    } = getState()

    await firebase.logout(user)
  } catch (error) {
    const { message } = error

    dialog.alert(message)
  } finally {
    dispatch(getUserSuccess(null))
    dispatch(getNotificationsSuccess([]))
  }
}
