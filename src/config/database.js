const mongoose = require('mongoose');
require('dotenv').config();



mongoose.Promise = global.Promise;
const connectDB = async () => {
   const conn = await mongoose.connect(process.env.MONGODB_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   });

   console.log(`Mongo Connected: ${conn.connection.host}`);
}

module.exports = connectDB;
