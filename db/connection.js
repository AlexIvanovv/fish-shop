import { MongoClient, ServerApiVersion } from "mongodb";
import keys from "../config/keys.js";

const URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : keys.mongoURI;

const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
});

try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
} catch (err) {
    console.error(err);
}

const db = client.db("ribarski-magazin");

export default db;