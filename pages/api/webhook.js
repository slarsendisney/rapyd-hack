
// Rapyd webhook handler
export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const body = req.body;
        console.log(body);
        res.status(200).end();
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    }
}
