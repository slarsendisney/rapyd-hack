import { makeRequest } from "../../utilities";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uid, currency, complete_url, cancel_url } = JSON.parse(
        req.body
      );
      const {
        body: {
          data,
        },
      } = await makeRequest("POST", "/v1/hosted/disburse/beneficiary", {
        category: "bank",
        beneficiary_entity_type: "individual",
        merchant_reference_id: uid,
        cancel_url,
        complete_url,
        sender_country: "US",
        sender_currency: "USD",
        payout_currency: currency,
        sender_entity_type: "individual",
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
