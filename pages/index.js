import Head from "next/head";
import Hero, { PlutusFeatures } from "../components/landing/Hero";
import StoreGallery from "../components/landing/StoreGallery";
import StoreHero from "../components/landing/StoreHero";
import StoreFeatures from "../components/landing/StoreFeatures";
import Layout from "../components/layout/Layout";
import { useStore } from "../context/store-context";

export default function Home() {
  const { store } = useStore();

  if (!store) {
    return (
      <div>
        <Head>
          <title>PlutusPay</title>
          <meta name="description" content="The no-code store generator." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Hero />
          <PlutusFeatures />
          <StoreGallery />
        </Layout>
      </div>
    );
  } else {
    return (
      <div>
        <Head>
          <title>{store.storeName}</title>
          <meta name="description" content="A store generated with plutuspay.app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <StoreHero />
          <StoreFeatures />
        </Layout>
      </div>
    );
  }
}
