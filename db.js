// ../config/db.js

import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/my-database/db1";

const connectToDatabase = () => {
    mongoose.connect(MONGO_URL)
        .then((con) => {
            console.log(`Database connected successfully: ${con.connection.host}`);
        })
        .catch((err) => {
            console.log(`Error detected while connecting to database: ${err}`);
        });
};

export default connectToDatabase; // Exporting the function as default
