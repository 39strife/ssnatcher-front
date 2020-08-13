import React from "react";
import Layout from "../../lib/Layout";

export default function Unauthorized() {
  return (
    <Layout>
      <div className="full-height centered">
        <div className="wrapper">
          <h2>
            Sorry but it seems that you don't have the permissions to view this
            page
          </h2>
        </div>
      </div>
    </Layout>
  );
}
