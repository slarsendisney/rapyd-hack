import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth-context";

export default function Book() {
  const {
    user: { uid, displayName },
  } = useAuth();
  return (
    <div>
      <Head>
        <title>Booking</title>
        <meta name="description" content="Generated with Plutus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-5xl mx-auto">
        <h1>Hey {displayName}, let's get you started.</h1>
        </div>
      </Layout>
    </div>
  );
}
