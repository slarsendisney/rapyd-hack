import { database } from "../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { subdomain, uid } = JSON.parse(req.body);
      console.log({ subdomain, uid });
      const db = database();
      const bookingsRef = await db.collection("bookings");
      let bookingCollections;

      bookingCollections = await bookingsRef
        .where("subdomain", "==", subdomain)
        .get();

      let data = [];
      bookingCollections.forEach((doc) => {
        const documentData = doc.data();
        data.push({ ...documentData, id: doc.id });
      });

      if (uid) {
        data = data.filter((booking) => booking.owner === uid);
      }
      res.send(data);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
