import React from "react";
import Layout from "../../lib/Layout";
import { ProtectedRoute, useAuth } from "../../lib/globals/AuthContext";
import {
  SettingsMenu,
  SettingsForm,
} from "../../components/Settings/settingsHelpers";
import { Image, Socials } from "../../components/Modals/ModalHelpers";
import { useForm, apiRoutes, useRequest } from "../../lib/hooks/useRequest";

export default function SettingsPage() {
  const { user } = useAuth();
  const [postData, { loading, message, errors }] = useRequest();
  const form = useForm({
    test: true,
    onSubmit: (formData) => {
      postData(apiRoutes.profile.update, formData);
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
