import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import BookingBreadcrumbs from "../../components/booking/BookingBreadcrumbs";
import BookingStep from "../../components/booking/BookingStep";
import Layout from "../../components/layout/Layout";
import { BookingProvider } from "../../context/booking-context";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>Booking</title>
        <meta name="description" content="Generated with Plutus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <BookingProvider id={id}>
          <div className="">
            <BookingBreadcrumbs />
            <AnimatePresence exitBeforeEnter>
              <BookingStep />
            </AnimatePresence>
          </div>
        </BookingProvider>
      </Layout>
    </div>
  );
}
