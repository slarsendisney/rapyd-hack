import { database } from "../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uid } = JSON.parse(req.body);
      const db = database();
      //get stores where owner is uid
      const stores = await db
        .collection("stores")
        .where("owner", "==", uid)
        .get();
      const data = [];
      stores.forEach((doc) => {
        data.push(doc.data());
      });
      res.send(data);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
