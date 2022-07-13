import { database } from "../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uid, storeName, subdomain:userSubdomainRequest, ...rest } = JSON.parse(req.body);
      const subdomain = userSubdomainRequest.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || storeName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      const db = database();
      const doc = await db.collection("stores").doc(subdomain).get();
      if (doc.exists) {
        res.status(400).send("Store already exists");
      } else {
        const doc = await db.collection("stores").doc(subdomain).set({
          owner: uid,
          storeName,
          subdomain,
          ...rest,
        });
        res.send({ subdomain });
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
