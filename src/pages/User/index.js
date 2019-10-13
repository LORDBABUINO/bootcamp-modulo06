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
    page: 1,
    refreshing: false,
  }

  async componentDidMount() {
    const { page } = this.state
    this.setState({ loading: true })
    await this.loadMore(page)()
    this.setState({ loading: false })
  }

  async componentDidUpdate() {
    console.tron.log(this.state)
  }

  loadMore = page => async () => {
    const { stars } = this.state
    const { navigation } = this.props
    const user = navigation.getParam('user')
    const { data: newStars } = await api.get(
      `/users/${user.login}/starred?page=${page}`
    )
    this.setState({ stars: [...stars, ...newStars], page: page + 1 })
  }

  refreshList = async () => {
    this.setState({ refreshing: true, stars: [] })
    await this.loadMore(1)()
    this.setState({ refreshing: false })
  }

  render() {
    const { stars, loading, refreshing, page } = this.state
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
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThereshold={0.2}
            onEndReached={this.loadMore(page)}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred
                onPress={() =>
                  navigation.navigate('Repository', {
                    url: item.html_url,
                    name: item.name,
                  })
                }>
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
    navigate: PropTypes.func,
  }).isRequired,
}

export default User
