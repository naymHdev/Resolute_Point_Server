require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middle ware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://resolute-point.netlify.app"],
    credentials: true,
  })
);
app.use(express.json());

//resolutePointServer
//uJpZMWNfEGKvsnxs

const uri =
  "mongodb+srv://resolutePointServer:uJpZMWNfEGKvsnxs@firstpractice.poejscf.mongodb.net/?retryWrites=true&w=majority&appName=FirstPractice";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const usersCollections = client.db("ResoluteP").collection("users");

    /// User Collection Route
    app.get("/users", async (req, res) => {
      const result = await usersCollections.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollections.insertOne(user);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB! 🌱"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Resolute Point Server! ✌️ ");
});

app.listen(port, () => {
  console.log(`Resolute Point Server Running on port ${port} ☆`);
});
