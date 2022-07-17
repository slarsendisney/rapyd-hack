import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/root/LoadingSpinner";
import { useAuth } from "../context/auth-context";
import { useStore } from "../context/store-context";

export default function Book() {
  const { push } = useRouter();
  const {
    user: { uid },
  } = useAuth();
  const { subdomain } = useStore()
  useEffect(() => {
    (async () => {
      const { bookingID } = await fetch("/api/generate-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          uuid: uid,
          subdomain,
        }),
      }).then((res) => res.json());
      push(`/book/${bookingID}`);
    })();
  }, []);

  return (
    <div>
      <Head>
        <title>Booking</title>
        <meta name="description" content="Generated with Plutus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LoadingSpinner text="Generating booking session..." />
      </Layout>
    </div>
  );
}
