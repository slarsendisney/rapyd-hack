export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
        const { uuid } = req.query;

        
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
