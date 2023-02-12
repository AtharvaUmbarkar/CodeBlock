import { MongoClient } from "mongodb";

if (!process.env.CODEBLOCK_AUTH_DB_URL) {
  throw new Error('Invalid/Missing environment variable: "CODEBLOCK_AUTH_DB_URL"');
}

const url: string = process.env.CODEBLOCK_AUTH_DB_URL;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

let globalWithMongoClientPromise = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(url, options);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  client = new MongoClient(url, options);
  clientPromise = client.connect();
}

export default clientPromise;
