const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://admin:JkdpN3UOm33Md4A0@myfirstdatabase.s9xahi1.mongodb.net/tickethack'

mongoose.connect(connectionString, {connectTimeoutMS:2000})
.then(() => console.log('Database connected'))
.catch(error => console.error(error));


module.exports = mongoose;