const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
      await mongoose.connect( process.env.MONGO_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });

      console.log('db connected')


    } catch (error) {
        console.log(error)
        throw new Error( 'Error en la conección' )

    }


}


module.exports = {
    dbConnection
}