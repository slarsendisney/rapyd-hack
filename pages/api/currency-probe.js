import { makeRequest } from "../../utilities";
var parser = require("accept-language-parser");
const countryToCurrency = require("country-to-currency");
const currencyFormatter = require("currency-formatter");

const availableCurrencies = async () => {
  const accounts = await makeRequest(
    "GET",
    "/v1/issuing/bankaccounts/list?ewallet=ewallet_cd21738512808e9db22367465ae294b5"
  );
  const currencies = accounts.body.data.bank_accounts.map(
    ({ currency }) => currency
  );
  return currencies;
};

export const reqToCurrency = (req) => {
  const currencies = parser
    .parse(req.headers["accept-language"])
    .filter(({ region }) => region)
    .map(({ region }) => countryToCurrency[region]);

  if (currencies.length > 0) {
    return currencies[0];
  }
  return "USD";
};

export const currencyProbe = async (req) => {
  const chargeCurrency = reqToCurrency(req);
  const currencies = await availableCurrencies();
  return {
    chargeCurrency: currencies.includes(chargeCurrency)
      ? chargeCurrency
      : "USD",
    availableCurrencies: currencies,
  };
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const currency = await currencyProbe(req);
      res.send(currency);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}
