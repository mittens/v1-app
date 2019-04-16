import React, { Component } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { getUser } from '../actions'
import { Text } from '../components'
import { Layout } from '../styles'

class Filters extends Component {
  componentDidMount() {
    const { getUser } = this.props

    getUser()
  }

  renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <Text>you don't have any filters</Text>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item}</Text>
      </View>
    )
  }

  render() {
    const {
      user: { filters = [] }
    } = this.props

    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text title>filters</Text>
          <Text style={styles.description}>
            hate the noise? filter it out. you can ignore notifications by repo,
            user, or keywords.
          </Text>
        </View>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.content}
          data={filters}
          ListEmptyComponent={this.renderEmpty}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  main: {
    flex: 1
  },
  header: {
    margin: Layout.margin
  },
  description: {
    marginTop: Layout.padding
  },
  list: {
    marginTop: Layout.margin
  },
  content: {
    flexGrow: 1
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})

const mapStateToProps = ({ user: { user } }) => ({
  user
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters)
