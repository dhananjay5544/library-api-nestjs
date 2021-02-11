import { KAFKA_CONFIG } from '../../environments/index';
export const clientOptions = {
  client: {
    clientId: KAFKA_CONFIG.clientId,
    brokers: [KAFKA_CONFIG.brokers],
  },
  consumer: {
    groupId: KAFKA_CONFIG.consumerGroupID,
  },
};
