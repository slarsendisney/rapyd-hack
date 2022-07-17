import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/root/LoadingSpinner";
import { useAuth } from "../context/auth-context";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Table from "../components/dashboard/Table/Table";
import EmptyState from "../components/dashboard/Table/EmptyState";
import StatsCard from "../components/dashboard/StatsCards";
import QuickActions from "../components/dashboard/QuickActions";

export default function Book() {
  const {
    user: { uid },
  } = useAuth();

  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetch("/api/get-stores", {
      method: "POST",
      body: JSON.stringify({ uid }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Error fetching stores");
      })
      .then((res) => {
        setStores(res);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  }, []);
  const columns = [
    { accessor: "storeName", value: "Store Name" },
    { accessor: "productName", value: "Product Name" },
    { accessor: "amount", value: "Amount" },
    { accessor: "subdomain", value: "Domain" },
  ];

  console.log(stores);

  const tableData = stores.map(({ rapyd, ...store }) => ({ expandedContent: (
    <div className="">
    <QuickActions store={{...store}} />
    <StatsCard store={{...store}}/>
    </div>
  ),
  ...store, rapyd }));
  return (
    <div>
      <Head>
        <title>My Stores</title>
        <meta name="description" content="Generated with Plutus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-6xl mx-auto md:px-4 space-y-4">
          <DashboardHeader table={stores} />
          {loading ? (
            <LoadingSpinner text="Finding your stores..." />
          ) : stores.length === 0 ? (
            <EmptyState />
          ) : (
            <Table expandable={true} columns={columns} data={tableData} />
          )}
        </div>
      </Layout>
    </div>
  );
}
