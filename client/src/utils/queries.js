import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    getMe {
       username
    }
  }
`;

export const GET_TTT = gql`
  query getTtt {
    getTtt
  }
`;