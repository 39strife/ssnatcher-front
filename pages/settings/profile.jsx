import React from "react";
import Layout from "../../lib/Layout";
import { ProtectedRoute, useAuth } from "../../lib/globals/AuthContext";
import {
  SettingsMenu,
  SettingsForm,
} from "../../components/Settings/settingsHelpers";
import {
  Image,
  SocialsInputs,
  Input,
} from "../../components/Modals/ModalHelpers";
import {
  useForm,
  apiRoutes,
  useRequest,
  STORAGE_URL,
} from "../../lib/hooks/useRequest";

export default function SettingsPage() {
  const { user } = useAuth();
  const [postData, { loading, message, errors, Message }] = useRequest();
  console.log(loading, message, errors);
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
              <div className="form-group image-preview">
                <label>Current Avatar:</label>
                <img src={STORAGE_URL + user.profile.avatar} />
              </div>
              <Image errors={errors} name="avatar" label="Avatar" />
              <div className="form-group image-preview">
                <label>Current Banner:</label>
                <img src={STORAGE_URL + user.profile.banner} />
              </div>
              <Image errors={errors} name="banner" label="Banner" />
              <Input
                errors={errors}
                textarea
                value={user.profile.description}
                name="description"
                label="Description"
                placeholder="Tell us something about you"
              />
              <SocialsInputs errors={errors} />
              <Message />
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
