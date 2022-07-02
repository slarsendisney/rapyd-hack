import { v4 as uuidv4 } from "uuid";
import { makeRequest } from "../../utilities";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uuid, bookingID, currency, countryCode } = req.body;
      const reference = `${uuid}.${bookingID}`;

      const {
        body: { data: WalletData },
      } = await makeRequest("POST", "/v1/issuing/bankaccounts", {
        currency: currency,
        country: countryCode,
        description: `Account issues for ${uuid} for booking ${bookingID}`,
        ewallet: process.env.RAPYD_EWALLET,
        merchant_reference_id: reference,
        metadata: {
          merchant_defined: true,
        },
      });

      // attach to booking in database

      res.send(WalletData);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
