import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, Form, Input, SubmitButton } from './styles'

const Main = () => (
  <Container>
    <Form>
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Adicionar usuário"
      />
      <SubmitButton>
        <Icon name="add" size={20} color="white" />
      </SubmitButton>
    </Form>
  </Container>
)

Main.navigationOptions = {
  title: 'Usuários',
}
export default Main
