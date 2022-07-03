import Head from "next/head";
import Image from "next/image";
import Hero from "../components/landing/Hero";
import StoreGallery from "../components/landing/StoreGallery";
import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero />
        <StoreGallery />
      </Layout>
    </div>
  );
}
