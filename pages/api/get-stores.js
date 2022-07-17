import { database } from "../../utils/intialiseFirebase";
import { makeRequest } from "../../utilities";
import CC from "currency-converter-lt"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uid } = JSON.parse(req.body);
      const db = database();
      //get stores where owner is uid
      const storeRef = await db.collection("stores");
      const bookingsRef = await db.collection("bookings");
      const userStores = await storeRef.where("owner", "==", uid).get();
      const data = [];
      userStores.forEach((doc) => {
        data.push(doc.data());
      });
      const results = await Promise.all(
        data.map(async ({ subdomain, rapyd: { id } }) => {
          try {
            const {
              body: { data: WalletData },
            } = await makeRequest("GET", `/v1/user/${id}`);
            const storeBookings = [];
            const storeQuery = await bookingsRef
              .where("subdomain", "==", subdomain)
              .get();
            storeQuery.forEach((doc) => {
              storeBookings.push(doc.data());
            });
            return { rapyd: WalletData, bookings: storeBookings };
          } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
          }
        })
      );
      results.map((item, i) => {
        const {bookings} = item;
        const fundsByCurrency = bookings.reduce((acc, curr) => {
          if(curr.rapyd){
            curr.rapyd.transactions.map(({amount, currency}) => {
              if(!acc[currency]){
                acc[currency] = amount;
              }
              acc[currency] += amount; 
            })
          }
          return acc;
        }, {})

        const expectedFutureFundsByCurrency = bookings.reduce((acc, curr) => {
          const { currency, localAmount } = curr;
          if(currency){
            if (acc[currency]) {
              acc[currency] += localAmount;
            } else {
              acc[currency] = localAmount;
            }
          }
          return acc;
        }, {})
       
        data[i] = { ...data[i], ...item, fundsByCurrency, expectedFutureFundsByCurrency };
      });
      for(const item of data){
        let allFundsInUSD = 0;
        const currencyKeys = Object.keys(item.fundsByCurrency);
        for(const currency of currencyKeys){
          if(currency !== "USD"){
          const currencyConverter = new CC({from:currency, to:"USD", amount:item.fundsByCurrency[currency]})
          const USDAmount = await currencyConverter.convert();
          allFundsInUSD += USDAmount;
          } else {
            allFundsInUSD += item.fundsByCurrency[currency];
          }
        }
        item.allFundsInUSD = allFundsInUSD
      }
     
      res.send(data);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
