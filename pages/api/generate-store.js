import { database } from "../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uuid, subdomain } = req.body;
      const db = database();
      const doc = await db.collection("stores").doc(subdomain).set({
        owner: uuid,
      });
      res.send({ subdomain });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
