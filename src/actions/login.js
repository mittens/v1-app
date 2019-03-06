import { dialog, firebase } from '../lib'

import { getUserPending, getUserSuccess, getUserFailure } from './get-user'

export default code => async dispatch => {
  dispatch(getUserPending())

  try {
    const token = await firebase.auth(code)

    const user = await firebase.login(token)

    dispatch(getUserSuccess(user))
  } catch (error) {
    dispatch(getUserFailure(error))

    const { message } = error

    dialog.alert(message)
  }
}
