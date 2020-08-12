import React from "react";
import Layout from "../../lib/Layout";
import { delay } from "../../lib/helpers";

export default function SearchPage() {
  return <Layout>Searching</Layout>;
}

SearchPage.getInitialProps = async () => {
  await delay(5);
  return { jako: "jako" };
};
