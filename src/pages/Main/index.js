import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '../../services/api'
import { Container, Form, Input, SubmitButton } from './styles'

class Main extends Component {
  state = {
    newUser: '',
    users: [],
  }

  handleAddUser = async () => {
    const { newUser, users } = this.state

    const {
      data: { name, login, bio, avatar_url: avatar },
    } = await api.get(`/users/${newUser}`)

    const data = { name, login, bio, avatar }
    this.setState({ users: [...users, data], newUser: '' })
    Keyboard.dismiss()
  }

  render() {
    const { newUser } = this.state
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="white" />
          </SubmitButton>
        </Form>
      </Container>
    )
  }
}

Main.navigationOptions = {
  title: 'Usuários',
}
export default Main
