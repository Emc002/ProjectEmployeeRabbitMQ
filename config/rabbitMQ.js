const amqp = require('amqplib');
const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
const RABBITMQ_PORT = process.env.RABBITMQ_PORT || 5672;
const RABBITMQ_USERNAME = process.env.RABBITMQ_USERNAME;
const RABBITMQ_PASSWORD = process.env.RABBITMQ_PASSWORD;
const exchangeName = 'employee.events';

exports.getChannel = async () => {
  try {
    const connection = await amqp.connect(`amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, 'topic', { durable: true });
    return channel;
  } catch (err) {
    throw err;
  }
};

// Publish message
exports.publishMessage = async (event, data) => {
  try {
    const channel = await this.getChannel();
    const message = JSON.stringify(data);
    channel.publish(exchangeName, `${event}`, Buffer.from(message));

    console.log(`Message published: ${event}`);
  } catch (err) {
    console.error(`Error publishing message: ${err}`);
  }
};
