import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
    throw new Error("No Database URL found in .env.")
}

const DATABASE_URL: string = process.env.DATABASE_URL;



/* Does not reconnect to DB if cached */


let globalWithMongoose = global as typeof globalThis & {
    mongoose: any;
}

let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { connection: null, promise: null };
}

async function connectDb() {
    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
        const options = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,

        };
        cached.promise = mongoose.connect(DATABASE_URL, options).then((mongoose) => {
            console.log("Connection made.");
            return mongoose;
        }).catch((error) => {
            console.log(error as Error);
        });
    }
    cached.connection = await cached.promise;
    console.log("Connection already established.")
    return cached.connection;
}

export default connectDb; 