import { database } from "../../../utils/intialiseFirebase";
import CC from "currency-converter-lt"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const db = database();
      const doc = await db.collection("bookings").doc(id).get();
      if (doc.exists) {
        const booking = doc.data();
        res.send(booking);
      } else {
        res.send(404, "Not Found");
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else if (req.method === "PATCH") {
    try {
      const { id, storeID } = req.query;
      const db = database();
      const doc = await db.collection("bookings").doc(id).get();
      if (doc.exists) {
        const data = JSON.parse(req.body);
        const newBookingDetails = { ...data };
        const currentData = doc.data();
        if(currentData.region && currentData.currency && !currentData.localAmount){

          const store = await db
          .collection("stores")
          .doc(storeID)
          .get();

          const storeData = store.data();

          const { currency } = currentData;
          let currencyConverter = new CC({from:"USD", to:currency, amount:storeData.amount})
          const localAmount =  await currencyConverter.convert();
          newBookingDetails.localAmount = localAmount;
        }
        await db
          .collection("bookings")
          .doc(id)
          .set(newBookingDetails, { merge: true });
       
        res.send({...newBookingDetails, ...doc.data()});
      } else {
        res.send(404, "Not Found");
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "GET, POST");
    res.status(405).end("Method Not Allowed");
  }
}
