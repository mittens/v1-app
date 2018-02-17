import { api, dialog, storage } from '../lib'

import { getTokenPending, getTokenSuccess, getTokenFailure } from './get-token'

export default token => {
  return async dispatch => {
    dispatch(getTokenPending())

    try {
      await storage.put('token', token)

      await api.get('/user')

      dispatch(getTokenSuccess(token))

      dialog.alert('Token saved')
    } catch (err) {
      dispatch(getTokenFailure(err))

      await storage.remove('token')

      dialog.alert(err.message)
    }
  }
}
