import { database } from "../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { subdomain } = JSON.parse(req.body);
      const db = database();
      const bookingsRef = await db.collection("bookings");
      const bookingCollections = await bookingsRef
        .where("subdomain", "==", subdomain)
        .get();
      const data = [];
      bookingCollections.forEach((doc) => {
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
