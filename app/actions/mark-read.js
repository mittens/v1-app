import moment from 'moment'

import { dialog, github } from '../lib'

import { getNotifications } from '.'

export default (time = moment()) => {
  return async dispatch => {
    try {
      await github.put(
        `/notifications?last_read_at=${moment(time).toISOString()}`
      )

      dispatch(getNotifications())
    } catch (err) {
      dialog.alert(err.message)
    }
  }
}
