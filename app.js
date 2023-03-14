const express = require('express');
const app = express();
const employee = require('./Routes/employee');
const project = require('./Routes/projectClient')
const connectDB = require('./DB/Connection');
const notFound = require('./Middleware/notFound');
const errorHandleMiddleware = require('./Middleware/errorHandle');
const errorHandlerabbitMq = require('./Middleware/errorRabbitMQ');
const userEvents = require('./Consume/employee');
require('dotenv').config();
userEvents.listenForUserEvents()
app.use(express.json());
app.use('/api/employees',employee);
app.use('/api/project',project);
app.use(notFound);
app.use(errorHandleMiddleware);
app.use(errorHandlerabbitMq);
const port = process.env.PORT || 3000

const starting = async () =>{
  try{
    await connectDB(process.env.DB_CONNECTION);
    app.listen(port, console.log(`Server is Listening on Port : ${port}....`))
  }catch(err){
    console.log(err)
  }
}
starting();



