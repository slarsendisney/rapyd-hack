import { database } from "../../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
        const { id } = req.query;
        const db = database();
        const doc = await db.collection("bookings").doc(id).get();
        if (doc.exists) {
            const booking = doc.data();
            res.send(booking)

        } else {
            res.send(404, "Not Found");
        }
        
     
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
