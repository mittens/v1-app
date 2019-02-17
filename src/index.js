import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Login, Notifications } from './scenes'

class Mittens extends Component {
  render() {
    const { user } = this.props

    if (user) {
      return <Notifications />
    }

    return <Login />
  }
}

const mapStateToProps = ({ user: { user } }) => ({
  user
})

export default connect(mapStateToProps)(Mittens)
