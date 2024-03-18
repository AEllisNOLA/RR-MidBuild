import { MongoClient } from "mongodb";


if (!process.env.DATABASE_URL) {
    throw new Error("MongoDB URI not found in .env file.");
}

const uri = process.env.DATABASE_URL as string;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;


if (process.env.NODE_ENV === "development") {


    let globalWithMongoClientPromise = global as typeof globalThis & {
        _mongoClientPromise: Promise<MongoClient>;
    };

    if (!globalWithMongoClientPromise._mongoClientPromise) {
        client = new MongoClient(uri);
        globalWithMongoClientPromise._mongoClientPromise = client.connect();

    }

    clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {

    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;