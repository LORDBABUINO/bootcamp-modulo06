import React from 'react'
import PropTypes from 'prop-types'
import { WebView } from 'react-native-webview'

const Repository = ({ navigation }) => (
  <WebView source={{ uri: navigation.getParam('url') }} style={{ flex: 1 }} />
)

Repository.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('name'),
})

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
}

export default Repository
