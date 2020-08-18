import React from "react";
import { ProtectedRoute } from "../../lib/globals/AuthContext";
import Layout from "../../lib/Layout";
import { useRouter } from "next/router";
import SideMenu from "../../components/Admin/SideMenu";
export default function adminPanel() {
  return (
    <Layout>
      <ProtectedRoute permissions={5} />
      <div className="admin">
        <div className="wrapper wrapper-fluid m-y-10 p-y-10">
          <div className="row m-y-10 p-y-10">
            <div className="col-md-2">
              <SideMenu />
            </div>
            <div className="col-md-10">asd</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
