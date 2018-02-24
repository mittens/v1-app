import { api, dialog, firebase } from '../lib'

import { getUserSuccess } from './get-user'

export default notifications => {
  return async dispatch => {
    try {
      const data = {
        user: {}
      }

      if (notifications) {
        const deviceToken = await firebase.token()

        data.user = {
          deviceToken
        }
      }

      const { user } = await api.put('/users/me', data)

      dispatch(getUserSuccess(user))
    } catch (err) {
      dialog.alert(err.message)
    }
  }
}
