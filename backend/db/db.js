const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect
    } catch (error){

    }

}