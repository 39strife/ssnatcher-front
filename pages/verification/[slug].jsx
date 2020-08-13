import React, { useState } from "react";
import Layout from "../../lib/Layout";
import Loading from "../../components/Loading";
import { postData } from "../../lib/hooks/useRequest";
export default function VerificationPage({ slug }) {
  console.log(slug);
  const [{ loading, status, message }, setLoading] = useState({
    loading: false,
    status: false,
    message: "",
  });
  const useRequest = async () => {
    const result = await postData();
  };
  return (
    <Layout>
      <div className="full-height centered">
        <div className="wrapper">
          <Loading loading message={"We are verifying your email"}>
            <h1>Your email has been verified</h1>
          </Loading>
        </div>
      </div>
    </Layout>
  );
}

VerificationPage.getInitialProps = async ({ query }) => {
  return { slug: query.slug };
};
