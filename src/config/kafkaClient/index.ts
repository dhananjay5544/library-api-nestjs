export const bookClientOptions = (args) => {
  return {
    client: {
      clientId: args == 'graphql' ? 'graphql-book' : 'book',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: args == 'graphql' ? 'graphql-book-consumer' : 'book-consumer',
    },
  };
};
