import React from "react";
import Layout from "../../lib/Layout";
import { ProtectedRoute } from "../../lib/globals/AuthContext";
import { SettingsMenu, SettingsForm } from "./settingsHelpers";

export default function SettingsLayout({
  children,
  title = "",
  description = "",
}) {
  return (
    <Layout>
      <ProtectedRoute />
      <div className="wrapper p-t-10">
        <div className="row">
          <SettingsMenu />
          <SettingsForm {...{ title, description }}>{children}</SettingsForm>
        </div>
      </div>
    </Layout>
  );
}
