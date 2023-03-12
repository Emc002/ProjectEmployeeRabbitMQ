const rabbitmq = require('../config/rabbitMQ');
const crud = require('../Service/CRUD')

exports.listenForUserEvents = async () => {
  try {
    const channel = await rabbitmq.getChannel();
    const employeeQueue = 'employee';
    const employeeExchange = 'employee.events';
    await channel.assertQueue(employeeQueue);
    const b = await channel.bindQueue(employeeQueue, employeeExchange, 'employee.*');
    await channel.consume(employeeQueue, async (message) => {
      const data = JSON.parse(message.content.toString());
      switch (message.fields.routingKey) {
        case 'employee.created':
          channel.ack(message);
          const employee = await crud.createEmployee(data);
          if(employee){
            console.log({message : "create Success", data : employee})
          }
          break;
        case 'employee.updated':
          const { id, ...dataEmployee } = data
          await crud.updateEmployee(id, dataEmployee);
          channel.ack(message);
          break;
        case 'employee.deleted':
          await crud.deleteEmployee(data);
          channel.ack(message);
          break;
        default:
          console.log(`Unknown message type: ${message.fields.routingKey}`);
      }

    });
  }catch(err){
    console.log(err)
  }
}
