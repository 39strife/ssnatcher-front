import React, { useState, useEffect } from "react";
import Layout from "../../lib/Layout";
import Loading from "../../components/Loading";
import { useRequest, apiRoutes } from "../../lib/hooks/useRequest";
import { useModalContext } from "../../lib/globals/ModalContext";
export default function VerificationPage({ token }) {
  const [submit, { loading, message }] = useRequest();
  const { setLogin } = useModalContext();
  useEffect(() => {
    submit(apiRoutes.auth.authenticate, { token });
  }, []);
  return (
    <Layout>
      <div className="full-height centered">
        <div className="wrapper">
          <Loading loading={loading} message={"We are verifying your email"}>
            <h2>{message}</h2>
            <div className="row m-t-5">
              <div className="col-md-4">
                <button onClick={() => setLogin(true)} className="btn">
                  Log in
                </button>
              </div>
            </div>
          </Loading>
        </div>
      </div>
    </Layout>
  );
}

VerificationPage.getInitialProps = async ({ query }) => {
  return { token: query.slug };
};
