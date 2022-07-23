import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import LoadingSpinner from "../../components/root/LoadingSpinner";
import { useAuth } from "../../context/auth-context";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Table from "../../components/dashboard/Table/Table";
import EmptyState from "../../components/dashboard/Table/EmptyState";
import StatsCard from "../../components/dashboard/StatsCards";
import QuickActions from "../../components/dashboard/QuickActions";

export default function Bookings() {
  const router = useRouter();
  const { store } = router.query;
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/get-bookings", {
      method: "POST",
      body: JSON.stringify({ subdomain: store }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error fetching stores");
      })
      .then((res) => {
        setBookings(
          res.filter(
            ({ payoutProvided, payoutApproved }) =>
              payoutProvided && !payoutApproved
          )
        );
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  }, []);


  const tableData = bookings.map((booking) => ({ approve: (
    <div className="flex">
    <div className="px-3 py-1 rounded-full bg-yellow-300 text-yellow-800 text-xs">
        Needs Approval
    </div></div>
  ),
  ...booking }));

  const columns = [
    { accessor: "owner", value: "Customer ID" },
    { accessor: "currency", value: "Currency" },
    { accessor: "localAmount", value: "Amount" },
    { accessor: "approve", value: "Approved?" },
  ];

  return (
    <div>
      <Head>
        <title>Refund Requests</title>
        <meta name="description" content="Generated with Plutus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-6xl mx-auto md:px-4 space-y-4">
          <h1 className="text-2xl">Refund Requests for <span className="text-accent-1 font-bold">{store}.plutuspay.app</span></h1>
          <DashboardHeader noCta searchText="Search refunds..." />
          {loading ? (
            <LoadingSpinner text="Finding your refunds..." />
          ) : (
            <Table expandable={false} columns={columns} data={tableData} />
          )}
        </div>
      </Layout>
    </div>
  );
}
