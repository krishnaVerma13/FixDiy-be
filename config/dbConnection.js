const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async ()=>{
    const uri = "mongodb+srv://admin:admin@diycluster.xea4j2y.mongodb.net/diyInfo?retryWrites=true&w=majority&appName=diyCluster"
    try {
        const connect = await mongoose.connect(uri);
        console.log("Database connected", connect.connection.host, connect.connection.name);
        // console.log(process.env.KRIS);
        
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}

module.exports = connectDB;