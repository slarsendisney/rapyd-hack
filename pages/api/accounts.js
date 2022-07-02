import { makeRequest } from "../../utilities";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const accounts = await makeRequest(
        "GET",
        "/v1/issuing/bankaccounts/list?ewallet=ewallet_cd21738512808e9db22367465ae294b5"
      );
      res.json(accounts);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
