import React from "react";
import Layout from "./Layout";
import { ProtectedRoute } from "./globals/AuthContext";
import SideMenu from "../components/Admin/SideMenu";

export default function AdminLayout({ children }) {
  return (
    <Layout>
      <ProtectedRoute permissions={5} />
      <div className="admin">
        <div className="wrapper wrapper-fluid m-y-10 p-y-10">
          <div className="row m-y-10 p-y-10">
            <div className="col-lg-2">
              <SideMenu />
            </div>
            <div className="col-lg-9 offset-lg-1">{children}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
