import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import api from '../../services/api'

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles'

class User extends Component {
  state = {
    stars: [],
    loading: false,
  }

  async componentDidMount() {
    const { navigation } = this.props
    this.setState({ loading: true })
    const user = navigation.getParam('user')
    const response = await api.get(`/users/${user.login}/starred`)
    this.setState({ stars: response.data, loading: false })
  }

  render() {
    const { stars, loading } = this.state
    const { navigation } = this.props
    const user = navigation.getParam('user')
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Container>
            <ActivityIndicator color="#333" />
          </Container>
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    )
  }
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
})

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
}

export default User
