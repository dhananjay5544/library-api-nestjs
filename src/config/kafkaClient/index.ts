export const clientOptions = {
  client: {
    clientId: 'book',
    brokers: ['kafka:9092'],
  },
  consumer: {
    groupId: 'book-consumer',
  },
};
