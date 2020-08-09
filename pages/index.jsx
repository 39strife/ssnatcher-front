import Head from "next/head";
import Layout from "../lib/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="hero">
        <img src="/static/images/hero.png" alt="" />
      </div>
    </Layout>
  );
}
