import { dialog, github, storage } from '../lib'

import { getTokenPending, getTokenSuccess, getTokenFailure } from './get-token'

export default token => {
  return async dispatch => {
    dispatch(getTokenPending())

    try {
      await storage.put('githubToken', token)

      await github.get('/user')

      dispatch(getTokenSuccess(token))
    } catch (err) {
      dispatch(getTokenFailure(err))

      await storage.remove('githubToken')

      dialog.alert(err.message)
    }
  }
}
