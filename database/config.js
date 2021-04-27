const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos activa');

    } catch (err) {
        throw new Error('Error al iniciar la db',err);
    }

}


module.exports = {
    dbConnection
}