import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/root/LoadingSpinner";
import { useAuth } from "../context/auth-context";
import DashboardHeader from "../components/dashboard/DashboardHeader";

export default function Book() {
  const { push } = useRouter();
  const {
    user: { uid },
  } = useAuth();

  return (
    <div>
      <Head>
        <title>Booking</title>
        <meta name="description" content="Generated with Plutus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-6xl mx-auto md:px-4">
          <DashboardHeader />
        </div>
      </Layout>
    </div>
  );
}
