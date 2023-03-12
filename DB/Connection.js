const mongoose = require('mongoose')

const connectDB = (url, next) => {
  try {
    mongoose.set('strictQuery', true);
    return mongoose.connect(url);
  } catch (err) {
    next(err)
  }

}

module.exports = connectDB