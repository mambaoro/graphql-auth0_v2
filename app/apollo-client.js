import ApolloClient from 'apollo-boost';
import auth from './containers/App/Auth';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: auth.getIdToken(),
      },
    }));
  },
});

export { client as default };
