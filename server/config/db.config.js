import mongoose from "mongoose";

const DB_PATH = process.env.DB_PATH || 'mongodb://127.0.0.1:27017/color-pallete'
const connectToDatabase = async () => {
    mongoose.connect(DB_PATH)
        .then(() => {
            console.log('Colors Server Connected to MongoDB Successfully');
        }).catch(err => {
            console.log('ERRR! Connection to MongoDB Failed');
            console.log(err);
        })
}

export { connectToDatabase};