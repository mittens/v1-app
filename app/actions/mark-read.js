import moment from 'moment'

import { dialog, github } from '../lib'

import { getNotifications } from '.'

export default (time = moment()) => {
  return async dispatch => {
    try {
      const last_read_at = moment(time).format('YYYY-MM-DDTHH:MM:SSZ')

      await github.put(`/notifications?last_read_at=${last_read_at}`)

      dispatch(getNotifications())
    } catch (err) {
      dialog.alert(err.message)
    }
  }
}
