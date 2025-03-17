import { MongoClient, ServerApiVersion } from "mongodb";

const URI = "mongodb+srv://vesdim2007:GbcYGwMapfre@cluster0.xcuwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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