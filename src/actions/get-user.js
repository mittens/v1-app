import { dialog, firebase } from '../lib'

export const GET_USER_PENDING = 'GET_USER_PENDING'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'

export const getUserPending = () => {
  return {
    type: GET_USER_PENDING
  }
}

export const getUserSuccess = user => {
  return {
    user,
    type: GET_USER_SUCCESS
  }
}

export const getUserFailure = error => {
  return {
    error,
    type: GET_USER_FAILURE
  }
}

export default () => async dispatch => {
  dispatch(getUserPending())

  try {
    firebase.user().onSnapshot(doc => dispatch(getUserSuccess(doc.data())))
  } catch (error) {
    dispatch(getUserFailure(error))

    const { message } = error

    dialog.alert(message)
  }
}
