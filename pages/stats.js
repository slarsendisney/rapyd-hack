import Head from "next/head";
import Layout from "../components/layout/Layout";
import StatsComponent from "../components/stats/StatsComponent";

export default function Home() {
  return (
    <div>
      <Head>
        <title>PlutusPay Stats</title>
        <meta name="description" content="The no-code store generator." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <StatsComponent />
      </Layout>
    </div>
  );
}
