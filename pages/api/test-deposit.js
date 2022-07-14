import { makeRequest } from "../../utilities";
import { database } from "../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { amount, currency, issued_bank_account, bookingID } = JSON.parse(
        req.body
      );
      const {
        body: { data: WalletData },
      } = await makeRequest(
        "POST",
        "/v1/issuing/bankaccounts/bankaccounttransfertobankaccount",
        {
          amount,
          currency,
          issued_bank_account,
        }
      );
      const db = database();
      const doc = await db.collection("bookings").doc(bookingID).get();
      if (doc.exists) {
        const booking = doc.data();
        const allData = { ...booking, depositPaid: true, rapyd: WalletData };

        await db
          .collection("bookings")
          .doc(bookingID)
          .set(allData, { merge: true });
        res.send(allData);
      } else {
        res.send(404, "Not Found");
      }
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
