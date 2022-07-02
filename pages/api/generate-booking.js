import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uuid } = req.body;
      const bookingID = uuidv4();
      
      // TODO attach booking id to UUID in firebase

      res.send({ bookingID });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
