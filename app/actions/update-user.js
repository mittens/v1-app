import { api, dialog, firebase } from '../lib'

import { getUserSuccess } from './get-user'

export default user => {
  return async dispatch => {
    try {
      if (user.badge !== undefined) {
        firebase.enableBadge(user.badge)
      }

      if (user.notifications) {
        user.deviceToken = await firebase.token()
      }

      const response = await api.put('/users/me', {
        user
      })

      dispatch(getUserSuccess(response.user))
    } catch (err) {
      dialog.alert(err.message)
    }
  }
}
