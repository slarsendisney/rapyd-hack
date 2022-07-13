import Head from "next/head";
import { StoreCreationForm } from "../components/create/StoreCreationForm";
import Layout from "../components/layout/Layout";

export default function Book() {
 

  return (
    <div>
      <Head>
        <title>Booking</title>
        <meta name="description" content="Generated with Plutus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="md:px-4 py-6">
        <StoreCreationForm/>
        </div>
      </Layout>
    </div>
  );
}
