import { database } from "../../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const db = database();
      const doc = await db.collection("bookings").doc(id).set({
        payoutProvided: true,
      }, { merge: true });
     res.redirect(`/book/${id}`);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
}
