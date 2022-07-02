import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/root/LoadingSpinner";
import { useAuth } from "../context/auth-context";

export default function Book() {
  const { push } = useRouter();
  const {
    user: { uid },
  } = useAuth();
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
        }),
      }).then((res) => res.json());
      push(`/book/${bookingID}`);
    })();
  }, [uid, push]);

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
