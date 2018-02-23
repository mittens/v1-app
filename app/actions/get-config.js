import {
  GET_CONFIG_PENDING,
  GET_CONFIG_SUCCESS,
  GET_CONFIG_FAILURE
} from '../constants'

import { api } from '../lib'

export const getConfigPending = () => {
  return {
    type: GET_CONFIG_PENDING
  }
}

export const getConfigSuccess = data => {
  return {
    type: GET_CONFIG_SUCCESS,
    data
  }
}

export const getConfigFailure = error => {
  return {
    type: GET_CONFIG_FAILURE,
    error
  }
}

export default () => {
  return async dispatch => {
    dispatch(getConfigPending())

    try {
      const config = await api.get('/github')

      dispatch(getConfigSuccess(config))
    } catch (err) {
      dispatch(getConfigFailure(err))

      dialog.alert(err.message)
    }
  }
}
