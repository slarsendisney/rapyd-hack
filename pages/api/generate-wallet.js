import { makeRequest } from "../../utilities";
import { database } from "../../utils/intialiseFirebase";
import { uuidv4 } from "@firebase/util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uid, subdomain } = JSON.parse(req.body);
      const uuid = uuidv4();
      const storeID = `${subdomain}|${uid}|${uuid}`;
      const {
        body: { data: WalletData },
      } = await makeRequest("POST", "/v1/user", {
        ewallet_reference_id: storeID,
        metadata: {
          subdomain,
          uid,
        },
        type: "company",
        contact: {
          contact_type: "business",
        },
      });
      console.log(WalletData);
      const db = database();
      const doc = await db.collection("stores").doc(subdomain).get();
      if (doc.exists) {
        const store = doc.data();
        const allData = { ...store, rapyd: WalletData };

        await db
          .collection("stores")
          .doc(subdomain)
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
