import { makeRequest } from "../../utilities";
var parser = require("accept-language-parser");
const countryToCurrency = require("country-to-currency");
const currencyFormatter = require("currency-formatter");


const availableCurrencies = ["USD", "SGD"];

export const reqToCurrency = (req) => {
  const currencies = parser
    .parse(req.headers["accept-language"])
    .filter(({ region }) => region)
    .map(({ region }) => ({region, currency: countryToCurrency[region]}));

  if (currencies.length > 0) {
    return currencies[0];
  }
  return ({region: "US", currency: "USD"});
};

export const currencyProbe = async (req) => {
  const {currency, region} = reqToCurrency(req);
  return {
    chargeCurrency: availableCurrencies.includes(currency)
      ? currency
      : "USD",
    availableCurrencies: availableCurrencies,
    region,
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
