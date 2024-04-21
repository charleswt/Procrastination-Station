import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import ScoreCard from './components/scores/scores';
import Leaderboard from './components/leaderboard/leaderboard'


// setting up httpLink
const link = createHttpLink({
  uri: '/graphql',
});

// adds auth token from local storage to bearer header specified
const authentication = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// ApolloClient is instantiated with authLink added to httplink and new memory cache created
const client = new ApolloClient({
  link: authentication.concat(link),
  cache: new InMemoryCache(),
});

// react components wrapped in Apollo server
function App() {
  return (
    <ApolloProvider client={client}>
        <Header />
        <Outlet />
        <Footer />
    </ApolloProvider>
  );
}

export default App;