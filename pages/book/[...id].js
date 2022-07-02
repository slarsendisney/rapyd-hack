import Head from "next/head";
import BookingSteps from "../../components/booking/BookingSteps";
import Layout from "../../components/layout/Layout";
import { BookingProvider } from "../../context/booking-context";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Booking</title>
        <meta name="description" content="Generated with Plutus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <BookingProvider>
          <div className="flex">
            <BookingSteps />
          </div>
        </BookingProvider>
      </Layout>
    </div>
  );
}
