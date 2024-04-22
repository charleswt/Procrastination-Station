import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    getUsers{
      username
      ttt
      snake
      pong
      dino
    }
  }
`;

export const GET_ME = gql`
  query getMe {
    getMe{
    username
    ttt
    snake
    pong
    dino
  }
  }
`;

export const GET_TTT = gql`
  query getTtt {
    getTtt
  }
`;