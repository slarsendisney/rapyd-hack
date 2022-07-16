import { makeRequest } from "../../utilities";
import { database } from "../../utils/intialiseFirebase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { uuid, bookingID, currency, countryCode, subdomain } = JSON.parse(
      req.body
    );
    const db = database();
    const storeInfo = await db.collection("stores").doc(subdomain).get();
    const {
      rapyd: { id: ewallet_id },
    } = storeInfo.data();
    try {
      const reference = `${uuid}.${bookingID}`;
      const {
        body: { data: WalletData },
      } = await makeRequest("POST", "/v1/issuing/bankaccounts", {
        currency: currency,
        country: countryCode,
        description: `Account issues for ${uuid} for booking ${bookingID}`,
        ewallet: ewallet_id,
        merchant_reference_id: reference,
        metadata: {
          merchant_defined: true,
        },
      });
      const doc = await db.collection("bookings").doc(bookingID).get();
      if (doc.exists) {
        const booking = doc.data();
        const allData = { ...booking, rapyd: WalletData };

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
