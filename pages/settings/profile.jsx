import React from "react";
import Layout from "../../lib/Layout";
import { ProtectedRoute, useAuth } from "../../lib/globals/AuthContext";
import {
  SettingsMenu,
  SettingsForm,
} from "../../components/Settings/settingsHelpers";
import { Image, Socials } from "../../components/Modals/ModalHelpers";
import { useForm } from "../../lib/hooks/useRequest";

export default function SettingsPage() {
  const { user } = useAuth();
  const form = useForm({
    test: true,
    onSubmit: (e) => {
      e.forEach((e, i) => console.log(e, i));
    },
    formData: true,
  });
  return (
    <Layout>
      <ProtectedRoute />
      <div className="wrapper p-t-10">
        <div className="row">
          <SettingsMenu />
          <SettingsForm
            title="Profile"
            description="Let's get you looking clean 🧼"
          >
            <form onSubmit={form.handleSubmit}>
              <Image name="avatar" label="Avatar" />
              <Image name="banner" label="Banner" />
              <Socials />
              <form.Message />
              <div className="form-group">
                <button className="btn" type="submit">
                  Save
                </button>
              </div>
            </form>
          </SettingsForm>
        </div>
      </div>
    </Layout>
  );
}
