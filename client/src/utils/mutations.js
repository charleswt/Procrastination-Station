import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        ttt
        snake
        pong
        dino
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username,  password: $password) {
      token
      user {
        _id
        username
        ttt
        snake
        pong
        dino
      }
    }
  }
`;

export const UPDATE_TTT = gql`
  mutation updateTtt($outcome: String!) {
    updateTtt(outcome: $outcome) {
       ttt
    }
  }
`;

export const UPDATE_SNAKE = gql`
  mutation updateSnake($outcome: String!) {
    updateSnake(outcome: $outcome) {
       snake
    }
  }
`;