const amqp = require('amqplib');
const connectionString = 'amqp://localhost';
const exchangeName = 'employee.events';

exports.getChannel = async () => {
  try {
    const connection = await amqp.connect(connectionString);
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
