import { MongoClient } from "mongodb";

const uri = "mongodb+srv://hasanbaba:Hasan1234@cluster0.d5bcawa.mongodb.net/rolecountDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  try {
    if (!client.isConnected()) await client.connect();
    const db = client.db("rolecountDB");
    const collection = db.collection("roleData");

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
