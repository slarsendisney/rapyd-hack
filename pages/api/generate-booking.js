import { v4 as uuidv4 } from "uuid";
import { database } from "../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uuid } = req.body;
      const bookingID = uuidv4();

      const db = database();
      const doc = await db.collection("bookings").doc(bookingID).set({
        owner: uuid,
        date: new Date(),
      });
      res.send({ bookingID });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
