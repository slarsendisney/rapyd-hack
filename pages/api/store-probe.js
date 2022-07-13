import { database } from "../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { subdomain } = JSON.parse(req.body);
      const db = database();
      //get stores where owner is uid
      const store = await db
        .collection("stores")
        .doc(subdomain)
        .get();
      if(store.exists){
        const data = store.data();
        res.send(data);
      } else {
        res.status(404).send("Store not found");
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
